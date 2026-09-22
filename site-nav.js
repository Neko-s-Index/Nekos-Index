// Shared navigation for Neko's Index.
// Populates <nav class="main-nav" data-autonav> with the canonical link set and
// marks the current page with aria-current="page". Pages should include a
// <noscript> fallback with static links for no-JS visitors and crawlers.
// Labels are translated via i18n.js when available (include i18n.js before this script).
(() => {
    const LINKS = [
        ['index.html', 'Home', 'nav.home'],
        ['list.html', 'Index', 'nav.index'],
        ['guides.html', 'Guides', 'nav.guides'],
        ['mylists.html', 'My Lists', 'nav.mylists'],
        ['notes.html', 'Notes', 'nav.notes'],
        ['socials.html', 'Socials', 'nav.socials'],
        ['sitemap.html', 'Sitemap', 'nav.sitemap'],
        ['privacy-settings.html', 'Privacy Settings', 'nav.privacySettings'],
        ['privacy.html', 'Privacy', 'nav.privacy'],
        ['disclaimer.html', 'Disclaimer', 'nav.disclaimer'],
        ['dmca.html', 'DMCA', 'nav.dmca'],
        ['donations.html', 'Donate', 'nav.donate'],
        ['adult.html', '18+', 'nav.adult'],
    ];

    const current = location.pathname.split('/').pop() || 'index.html';

    function label(fallback, key) {
        return (window.NekoI18n ? window.NekoI18n.t(key) : fallback);
    }

    function buildNav() {
        document.querySelectorAll('nav.main-nav[data-autonav]').forEach(nav => {
            nav.innerHTML = '';
            for (const [href, fallback, key] of LINKS) {
                const a = document.createElement('a');
                a.href = href;
                a.textContent = label(fallback, key);
                if (href === current) a.setAttribute('aria-current', 'page');
                nav.appendChild(a);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }

    document.addEventListener('nekoLangChange', buildNav);
})();
