// Advanced accent theming for Neko's Index.
// Runs synchronously (not deferred) so the chosen accent color is applied
// before first paint, avoiding a flash of the default colors. Works on every
// page: it overrides the --accent-primary/--accent-secondary/--accent-gradient
// custom properties on <html>, which take priority over each page's own
// :root {} declarations since inline styles beat stylesheet rules.
(() => {
    const PRESET_KEY = 'nekos_accent_theme';
    const CUSTOM_KEY = 'nekos_accent_custom';

    const PRESETS = {
        'blue-pink':    { name: 'Blue & Pink (Default)', primary: '#3b82f6', secondary: '#f472b6', angle: 115 },
        'blue-purple':  { name: 'Blue & Purple',          primary: '#3b82f6', secondary: '#8b5cf6', angle: 135 },
        'teal-green':   { name: 'Teal & Green',           primary: '#14b8a6', secondary: '#22c55e', angle: 120 },
        'amber-orange': { name: 'Amber & Orange',         primary: '#f59e0b', secondary: '#fb923c', angle: 110 },
        'crimson-rose': { name: 'Crimson & Rose',         primary: '#e11d48', secondary: '#fb7185', angle: 120 },
        'violet-indigo':{ name: 'Violet & Indigo',        primary: '#8b5cf6', secondary: '#6366f1', angle: 130 },
        'mono':         { name: 'Monochrome',             primary: '#9ca3af', secondary: '#6b7280', angle: 120 },
    };

    function getCustom() {
        try {
            const raw = JSON.parse(localStorage.getItem(CUSTOM_KEY));
            if (raw && raw.primary && raw.secondary) return raw;
        } catch (e) {}
        return null;
    }

    function getPresetName() {
        return localStorage.getItem(PRESET_KEY) || 'blue-pink';
    }

    function getActiveColors() {
        const name = getPresetName();
        if (name === 'custom') {
            return getCustom() || PRESETS['blue-pink'];
        }
        return PRESETS[name] || PRESETS['blue-pink'];
    }

    function apply(colors) {
        const root = document.documentElement.style;
        const angle = colors.angle || 115;
        root.setProperty('--accent-primary', colors.primary);
        root.setProperty('--accent-secondary', colors.secondary);
        root.setProperty('--accent-gradient', `linear-gradient(${angle}deg, ${colors.primary} 0%, ${colors.secondary} 100%)`);
    }

    function pulse() {
        const html = document.documentElement;
        if (document.body && document.body.classList.contains('reduce-motion')) return;
        html.classList.remove('neko-theme-pulse');
        // Restart the animation even if it's already mid-play
        void html.offsetWidth;
        html.classList.add('neko-theme-pulse');
        setTimeout(() => html.classList.remove('neko-theme-pulse'), 500);
    }

    function ensurePulseStyle() {
        if (document.getElementById('nekoThemePulseStyle')) return;
        const style = document.createElement('style');
        style.id = 'nekoThemePulseStyle';
        style.textContent = `
            html.neko-theme-pulse {
                animation: nekoThemePulse 0.5s ease;
            }
            @keyframes nekoThemePulse {
                0% { filter: saturate(1.6) brightness(1.08); }
                100% { filter: saturate(1) brightness(1); }
            }
        `;
        document.head.appendChild(style);
    }

    function applyCurrent(animate) {
        if (animate) {
            ensurePulseStyle();
            pulse();
        }
        apply(getActiveColors());
    }

    function setPreset(name, animate) {
        if (!PRESETS[name]) return;
        localStorage.setItem(PRESET_KEY, name);
        applyCurrent(animate !== false);
        syncControls();
    }

    function setCustom(primary, secondary, angle, animate) {
        localStorage.setItem(PRESET_KEY, 'custom');
        localStorage.setItem(CUSTOM_KEY, JSON.stringify({ primary, secondary, angle: angle || 115 }));
        applyCurrent(animate !== false);
        syncControls();
    }

    function resetToDefault() {
        localStorage.removeItem(PRESET_KEY);
        localStorage.removeItem(CUSTOM_KEY);
        applyCurrent(true);
        syncControls();
    }

    // Keep any rendered swatch/picker controls (on any page) in sync with the active theme
    function syncControls() {
        const active = getPresetName();
        document.querySelectorAll('.neko-theme-swatch').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === active);
        });
        const colors = getActiveColors();
        const primaryInput = document.getElementById('themeCustomPrimary');
        const secondaryInput = document.getElementById('themeCustomSecondary');
        const angleInput = document.getElementById('themeCustomAngle');
        if (primaryInput && document.activeElement !== primaryInput) primaryInput.value = colors.primary;
        if (secondaryInput && document.activeElement !== secondaryInput) secondaryInput.value = colors.secondary;
        if (angleInput && document.activeElement !== angleInput) angleInput.value = colors.angle || 115;
    }

    // Apply immediately (synchronously), before the rest of the page renders
    apply(getActiveColors());

    document.addEventListener('DOMContentLoaded', () => syncControls());

    window.NekoTheme = { PRESETS, getPresetName, getActiveColors, setPreset, setCustom, resetToDefault, applyCurrent, syncControls };
})();
