#!/usr/bin/env node
/**
 * check-links.mjs
 *
 * Weekly link health check (see .github/workflows/link-check.yml):
 *  - Collects every external href in the repo-root *.html files plus every
 *    link field in data/descriptions.json
 *  - HEADs each URL (GET fallback on 405), follows redirects, 15s timeout
 *  - Classifies: ok (<400) / warn (401, 403, 429, 999, timeouts — sites often
 *    block bots) / fail (other 4xx/5xx, DNS and network errors)
 *  - Writes link-report.md and link-report.json
 *
 * Always exits 0 — the workflow opens/updates an issue from the report.
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONCURRENCY = 8;
const TIMEOUT_MS = 15_000;
const UA = 'Mozilla/5.0 (compatible; NekosIndex-LinkCheck/1.0)';

function log(msg) {
  console.log(`[check-links] ${msg}`);
}

// url -> first-seen source page
const links = new Map();

function addLink(rawUrl, page) {
  if (!rawUrl || typeof rawUrl !== 'string') return;
  const url = rawUrl.trim().replace(/&amp;/g, '&');
  if (!url || url.startsWith('#')) return;
  let u;
  try {
    u = new URL(url);
  } catch {
    return;
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return;
  const host = u.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.endsWith('.localhost')
  ) {
    return;
  }
  if (host === 'nekosindex.com' || host.endsWith('.nekosindex.com')) return;
  const key = u.toString();
  if (!links.has(key)) links.set(key, page);
}

function collectLinks() {
  // 1. hrefs in repo-root html files
  for (const file of readdirSync(ROOT)) {
    if (!file.toLowerCase().endsWith('.html')) continue;
    let html;
    try {
      html = readFileSync(join(ROOT, file), 'utf8');
    } catch {
      continue;
    }
    const re = /href="(https?:\/\/[^"]+)"/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      addLink(m[1], file);
    }
  }

  // 2. url fields in data/descriptions.json
  try {
    const entries = JSON.parse(
      readFileSync(join(ROOT, 'data', 'descriptions.json'), 'utf8'),
    );
    if (Array.isArray(entries)) {
      for (const e of entries) {
        if (!e || typeof e !== 'object') continue;
        addLink(e.url, 'descriptions.json');
        addLink(e.website, 'descriptions.json');
        addLink(e.github, 'descriptions.json');
        addLink(e.download, 'descriptions.json');
        if (Array.isArray(e.socials)) {
          for (const s of e.socials) {
            if (s && s.url) addLink(s.url, 'descriptions.json');
          }
        }
      }
    }
  } catch (err) {
    log(`could not read data/descriptions.json: ${err.message}`);
  }
}

async function check(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const opts = {
      redirect: 'follow',
      headers: { 'User-Agent': UA },
      signal: ac.signal,
    };
    let res = await fetch(url, { ...opts, method: 'HEAD' });
    if (res.status === 405) {
      res = await fetch(url, { ...opts, method: 'GET' });
    }
    return { status: res.status };
  } catch (err) {
    return { status: 0, error: err };
  } finally {
    clearTimeout(timer);
  }
}

function describeError(err) {
  const cause = err && (err.cause || err);
  return String(
    (cause && (cause.code || cause.message)) || err || 'network error',
  );
}

function classify(result) {
  if (result.status > 0) {
    if (result.status < 400) return 'ok';
    if ([401, 403, 429, 999].includes(result.status)) return 'warn';
    return 'fail';
  }
  const err = result.error;
  const name = (err && err.name) || (err && err.cause && err.cause.name) || '';
  const code = (err && err.code) || (err && err.cause && err.cause.code) || '';
  // Timeouts -> warn (likely bot-blocking); DNS/other network errors -> fail
  if (
    name === 'AbortError' ||
    name === 'TimeoutError' ||
    code === 'ETIMEDOUT' ||
    code === 'UND_ERR_CONNECT_TIMEOUT'
  ) {
    return 'warn';
  }
  return 'fail';
}

function writeReports(results, note) {
  const failed = results.filter((r) => r.class === 'fail');
  const warned = results.filter((r) => r.class === 'warn');
  const ok = results.filter((r) => r.class === 'ok');
  const entryLine = (r) =>
    `- [${r.url}](${r.url}) — ${r.status} — page: ${r.page}`;

  const md = [
    '# Link Check Report',
    '',
    `_Generated: ${new Date().toISOString()}_`,
    '',
    ...(note ? [`> ${note}`, ''] : []),
    '| Result | Count |',
    '| --- | --- |',
    `| OK (<400) | ${ok.length} |`,
    `| Warnings (401/403/429/999/timeouts) | ${warned.length} |`,
    `| Failed | ${failed.length} |`,
    `| **Total checked** | ${results.length} |`,
    '',
    '## Failed',
    '',
    ...(failed.length ? failed.map(entryLine) : ['_No failed links._']),
    '',
    '## Warnings (may be false positives)',
    '',
    ...(warned.length ? warned.map(entryLine) : ['_No warnings._']),
    '',
  ].join('\n');

  writeFileSync(join(ROOT, 'link-report.md'), md);
  writeFileSync(
    join(ROOT, 'link-report.json'),
    JSON.stringify(
      {
        failed: failed.map(({ url, status, page }) => ({ url, status, page })),
        warned: warned.map(({ url, status, page }) => ({ url, status, page })),
        checked: results.length,
      },
      null,
      2,
    ) + '\n',
  );

  log(
    `done: ${ok.length} ok, ${warned.length} warnings, ${failed.length} failed (${results.length} checked)`,
  );
}

async function main() {
  collectLinks();
  log(`checking ${links.size} unique links`);

  const queue = [...links.entries()];
  const results = [];
  let idx = 0;
  let done = 0;

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (idx < queue.length) {
        const [url, page] = queue[idx++];
        const result = await check(url);
        results.push({
          url,
          page,
          class: classify(result),
          status:
            result.status > 0
              ? `HTTP ${result.status}`
              : describeError(result.error),
        });
        done++;
        if (done % 50 === 0 || done === queue.length) {
          log(`progress: ${done}/${queue.length}`);
        }
      }
    }),
  );

  writeReports(results);
}

main().catch((err) => {
  console.error('[check-links] fatal:', err);
  // Still emit both reports so the artifact upload and issue step work.
  try {
    writeReports([], `Link check crashed: ${err && err.message ? err.message : err}`);
  } catch {}
  process.exitCode = 0; // never fail the job
});
