#!/usr/bin/env node
/**
 * fetch-metadata.mjs
 *
 * Offline enrichment of data/descriptions.json:
 *  - Parses GitHub repo links out of list.html
 *  - Fetches repo description/homepage from api.github.com
 *  - Mines repo READMEs for social links (discord, telegram, reddit, x,
 *    youtube, bluesky, matrix)
 *
 * Runs in scheduled CI (see .github/workflows/update-metadata.yml) so the
 * site no longer needs unauthenticated api.github.com calls at runtime.
 *
 * Always exits 0 — partial success is fine.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LIST_HTML = join(ROOT, 'list.html');
const DESC_JSON = join(ROOT, 'data', 'descriptions.json');

const MAX_REPOS = 400;
const CONCURRENCY = 6;
const TIMEOUT_MS = 10_000;
const MAX_SOCIALS = 5;

// Matches auto-generated stubs like "Foo is a Streaming VPNs app or resource."
const GENERIC_DESC = /^.* is (a|an) .* (app|resource)\.?$/i;

// github.com first path segments that are never <owner>/<repo>
const SKIP_SEGMENTS = new Set([
  'topics', 'sponsors', 'marketplace', 'settings', 'login', 'signup', 'orgs',
  'explore', 'features', 'pricing', 'trending', 'collections', 'about',
  'contact', 'new', 'import', 'organizations', 'notifications', 'search',
  'pulls', 'issues', 'dashboard', 'gist', 'apps', 'enterprise', 'join',
  'watching', 'stars', 'security', 'readme', 'events', 'sessions',
]);

let rateLimited = false;
let updatedCount = 0;
let addedCount = 0;

function log(msg) {
  console.log(`[fetch-metadata] ${msg}`);
}

function normalizeUrl(u) {
  return String(u)
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'");
}

/** Return { owner, repo } for github.com/<owner>/<repo> URLs, else null. */
function parseGithubRepo(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (u.hostname.toLowerCase() !== 'github.com') return null;
  const parts = u.pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const [owner, repo] = parts;
  if (SKIP_SEGMENTS.has(owner.toLowerCase())) return null;
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;
  return { owner, repo };
}

/** GitHub API fetch with timeout. Returns { status, data }. */
async function ghFetch(path) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const headers = {
      'User-Agent': 'nekos-index-metadata',
      Accept: 'application/vnd.github+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: ac.signal,
    });
    const data = res.ok ? await res.json().catch(() => null) : null;
    return { status: res.status, data };
  } catch {
    return { status: 0, data: null };
  } finally {
    clearTimeout(timer);
  }
}

/** Classify a URL as a social type, or return null. */
function classifySocial(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
  const host = u.hostname.toLowerCase();
  const path = u.pathname;
  if (host === 'discord.gg') return 'discord';
  if ((host === 'discord.com' || host === 'www.discord.com' || host === 'discordapp.com') && path.startsWith('/invite')) return 'discord';
  if (host === 't.me' || host === 'telegram.me' || host === 'www.t.me') return 'telegram';
  if ((host === 'reddit.com' || host === 'www.reddit.com' || host === 'old.reddit.com') && path.startsWith('/r/')) return 'reddit';
  if (host === 'x.com' || host === 'www.x.com' || host === 'twitter.com' || host === 'www.twitter.com') return path.length > 1 ? 'x' : null;
  if ((host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') && /^\/(@|channel\/|c\/)/.test(path)) return 'youtube';
  if (host === 'bsky.app' || host === 'www.bsky.app') return 'bluesky';
  if (host === 'matrix.to' || host === 'www.matrix.to') return 'matrix';
  return null;
}

/** Extract up to MAX_SOCIALS social {url, type, label} entries from text. */
function extractSocials(text) {
  const found = [];
  const seen = new Set();
  const urlRe = /https?:\/\/[^\s<>"'()[\]{}]+/gi;
  let m;
  while ((m = urlRe.exec(text)) !== null) {
    const raw = m[0].replace(/[.,;:!?'"]+$/, '');
    const type = classifySocial(raw);
    if (!type) continue;
    let canonical;
    try {
      canonical = new URL(raw).toString();
    } catch {
      continue;
    }
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    found.push({
      url: canonical,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    });
    if (found.length >= MAX_SOCIALS) break;
  }
  return found;
}

/** Simple promise pool; stops scheduling new work once rate limited. */
async function runPool(items, worker) {
  let idx = 0;
  const lanes = Array.from(
    { length: Math.min(CONCURRENCY, items.length) },
    async () => {
      while (idx < items.length) {
        if (rateLimited) return;
        const item = items[idx++];
        await worker(item);
      }
    },
  );
  await Promise.all(lanes);
}

async function main() {
  const html = readFileSync(LIST_HTML, 'utf8');
  const entries = JSON.parse(readFileSync(DESC_JSON, 'utf8'));
  if (!Array.isArray(entries)) {
    throw new Error('data/descriptions.json is not a JSON array');
  }
  const originalJson = JSON.stringify(entries);

  const byUrl = new Map();
  for (const e of entries) {
    if (e && e.url) byUrl.set(normalizeUrl(e.url), e);
  }

  // Collect deduped github repo links (first occurrence wins for link text).
  const repos = new Map(); // "owner/repo" (lower) -> { url, title, owner, repo }
  const anchorRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const url = decodeEntities(m[1].trim());
    const parsed = parseGithubRepo(url);
    if (!parsed) continue;
    const key = `${parsed.owner}/${parsed.repo}`.toLowerCase();
    if (repos.has(key)) continue;
    const title = decodeEntities(
      m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    );
    repos.set(key, { url, title, ...parsed });
    if (repos.size >= MAX_REPOS) break;
  }
  log(`found ${repos.size} github repo links in list.html (cap ${MAX_REPOS})`);

  let done = 0;
  await runPool([...repos.values()], async (r) => {
    const n = ++done;
    const key = normalizeUrl(r.url);
    let entry = byUrl.get(key);
    if (!entry) {
      entry = { url: r.url, title: r.title || r.repo };
      entries.push(entry);
      byUrl.set(key, entry);
      addedCount++;
    }

    const needsDesc =
      !entry.description || GENERIC_DESC.test(entry.description);
    const needsSocials =
      !Array.isArray(entry.socials) || entry.socials.length === 0;
    if (!needsDesc && !needsSocials) return;

    let changed = false;
    let repoExists = null;

    if (needsDesc) {
      const { status, data } = await ghFetch(`/repos/${r.owner}/${r.repo}`);
      if (status === 403 || status === 429) {
        rateLimited = true;
        log(`rate limited (HTTP ${status}) at repo ${n}/${repos.size} — skipping remaining fetches`);
        return;
      }
      repoExists = status === 200 && !!data;
      if (data) {
        if (typeof data.description === 'string' && data.description.trim()) {
          const desc = data.description.trim();
          if (desc !== entry.description) {
            entry.description = desc;
            changed = true;
          }
        }
        if (
          !entry.website &&
          typeof data.homepage === 'string' &&
          /^https?:\/\//i.test(data.homepage.trim())
        ) {
          entry.website = data.homepage.trim();
          changed = true;
        }
      }
    }

    if (needsSocials && !rateLimited && repoExists !== false) {
      const { status, data } = await ghFetch(
        `/repos/${r.owner}/${r.repo}/readme`,
      );
      if (status === 403 || status === 429) {
        rateLimited = true;
        log(`rate limited (HTTP ${status}) at repo ${n}/${repos.size} — skipping remaining fetches`);
        return;
      }
      if (data && typeof data.content === 'string' && data.content) {
        const text = Buffer.from(
          data.content.replace(/\s/g, ''),
          'base64',
        ).toString('utf8');
        const socials = extractSocials(text);
        if (socials.length) {
          entry.socials = socials;
          changed = true;
        }
      }
    }

    if (changed) updatedCount++;
    if (n % 25 === 0) log(`progress: ${n}/${repos.size} repos processed`);
  });

  if (JSON.stringify(entries) !== originalJson) {
    writeFileSync(DESC_JSON, JSON.stringify(entries, null, 2) + '\n');
    log('descriptions.json written');
  } else {
    log('no changes to descriptions.json');
  }
  console.log(`updated ${updatedCount} entries, added ${addedCount}`);
}

main().catch((err) => {
  console.error('[fetch-metadata] fatal:', err);
  process.exitCode = 0; // partial success is fine — never fail the job
});
