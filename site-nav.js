// Shared navigation for Neko's Index.
// Populates <nav class="main-nav" data-autonav> with the canonical link set and
// marks the current page with aria-current="page". Pages should include a
// <noscript> fallback with static links for no-JS visitors and crawlers.
(() => {
    const LINKS = [
        ['index.html', 'Home'],
        ['list.html', 'Index'],
        ['guides.html', 'Guides'],
        ['mylists.html', 'My Lists'],
        ['notes.html', 'Notes'],
        ['socials.html', 'Socials'],
        ['sitemap.html', 'Sitemap'],
        ['privacy-settings.html', 'Privacy Settings'],
        ['privacy.html', 'Privacy'],
        ['disclaimer.html', 'Disclaimer'],
        ['dmca.html', 'DMCA'],
        ['donations.html', 'Donate'],
        ['adult.html', '18+'],
    ];

    const current = location.pathname.split('/').pop() || 'index.html';

    function buildNav() {
        document.querySelectorAll('nav.main-nav[data-autonav]').forEach(nav => {
            nav.innerHTML = '';
            for (const [href, label] of LINKS) {
                const a = document.createElement('a');
                a.href = href;
                a.textContent = label;
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
})();
