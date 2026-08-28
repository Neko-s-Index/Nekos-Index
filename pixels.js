(() => {
    const IS_MOBILE = () => window.innerWidth < 768;

    // ---- Scanline overlay for retro CRT look ----
    const scanlines = document.createElement('div');
    scanlines.setAttribute('aria-hidden', 'true');
    scanlines.style.position = 'fixed';
    scanlines.style.top = '0';
    scanlines.style.left = '0';
    scanlines.style.width = '100vw';
    scanlines.style.height = '100vh';
    scanlines.style.zIndex = '9999';
    scanlines.style.pointerEvents = 'none';
    scanlines.style.opacity = '0.05';
    scanlines.style.background = `
        repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.25) 0px,
            rgba(0, 0, 0, 0.25) 1px,
            transparent 1px,
            transparent 4px
        )
    `;
    document.body.appendChild(scanlines);

    // ---- Pixel canvas ----
    const canvas = document.createElement('canvas');
    canvas.id = 'pixel-rain';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.right = '0';
    canvas.style.width = '120px';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.6';
    canvas.style.imageRendering = 'pixelated';
    canvas.width = 120;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    if (IS_MOBILE()) {
        canvas.style.width = '70px';
        canvas.style.height = '120px';
        canvas.width = 70;
        canvas.height = 120;
    }

    const ctx = canvas.getContext('2d');

    // ---- Colors ----
    const colors = [
        '#3b82f6', // blue
        '#8b5cf6', // purple
        '#f472b6', // pink
        '#22c55e', // green
        '#f59e0b', // amber
        '#06b6d4'  // cyan
    ];

    // ---- Particle system ----
    const particles = [];

    function spawnPixel(x, y, burst = false) {
        const size = Math.random() > 0.7 ? 5 : 3;
        const speed = Math.random() * 1.8 + 0.4;
        particles.push({
            x: x !== undefined ? x : Math.random() * canvas.width,
            y: y !== undefined ? y : -10,
            size: size,
            speed: speed,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.7 + 0.2,
            drift: (Math.random() - 0.5) * 0.6,
            wander: (Math.random() - 0.5) * 0.08,
            vx: burst ? (Math.random() - 0.5) * 5 : 0,
            vy: burst ? -(Math.random() * 4 + 2) : speed
        });
    }

    function spawnBurst(x, y) {
        for (let i = 0; i < 16; i++) {
            spawnPixel(x, y, true);
        }
    }

    // ---- Mouse tracking ----
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseInCanvas = false;

    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseInCanvas =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
    });

    window.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        } else {
            x = canvas.width / 2;
            y = 30;
        }
        spawnBurst(x, y);
        catJump = 10;
        cat.targetX = Math.max(0, Math.min(canvas.width - cat.width, x - cat.width / 2));
    });

    // ---- Pixel cat ----
    const cat = {
        x: canvas.width / 2 - 10,
        y: 16,
        targetX: canvas.width / 2 - 10,
        scale: 2,
        width: 20,
        height: 18,
        blinkTimer: 0,
        isBlinking: false,
        tailSway: 0
    };

    let catJump = 0;

    function updateCat() {
        // Follow mouse, click, or patrol
        if (mouseInCanvas) {
            cat.targetX = Math.max(0, Math.min(canvas.width - cat.width, mouseX - cat.width / 2));
        }

        // Smooth movement toward target
        cat.x += (cat.targetX - cat.x) * 0.05;

        // Patrol when idle
        if (!mouseInCanvas && Math.abs(cat.x - cat.targetX) < 1) {
            cat.targetX = Math.random() * (canvas.width - cat.width);
        }

        // Tail wag
        cat.tailSway = Math.sin(Date.now() / 120) * 1.5;

        // Blink randomly
        if (cat.blinkTimer++ > 120 + Math.random() * 240) {
            cat.isBlinking = true;
            if (cat.blinkTimer > 140 + Math.random() * 240) {
                cat.isBlinking = false;
                cat.blinkTimer = 0;
            }
        }

        if (catJump > 0) {
            catJump = Math.max(0, catJump - 0.6);
        }
    }

    function drawCat() {
        const s = cat.scale;
        const ox = cat.x;
        const oy = cat.y - catJump;

        // Black 8-bit cat sprite
        const body = [
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0]
        ];

        ctx.fillStyle = '#0a0a0a';
        for (let row = 0; row < body.length; row++) {
            for (let col = 0; col < body[row].length; col++) {
                if (body[row][col]) {
                    ctx.fillRect(ox + col * s, oy + row * s, s, s);
                }
            }
        }

        // Ears
        ctx.fillRect(ox - s, oy + s, s, s);
        ctx.fillRect(ox + cat.width, oy + s, s, s);

        // Tail
        const t = Math.floor(cat.tailSway);
        ctx.fillRect(ox + cat.width + s + t, oy + 4 * s, s, 4 * s);
        ctx.fillRect(ox + cat.width + 2 * s + t, oy + 5 * s, s, 3 * s);

        // Eyes
        if (!cat.isBlinking) {
            // Eye movement based on mouse
            let px = 0, py = 0;
            if (mouseInCanvas) {
                const dx = mouseX - (ox + 2.5 * s);
                const dy = mouseY - (oy + 2 * s);
                const angle = Math.atan2(dy, dx);
                const dist = Math.min(2, Math.hypot(dx, dy) / 40);
                px = Math.cos(angle) * dist;
                py = Math.sin(angle) * dist;
            }

            ctx.fillStyle = '#fff';
            ctx.fillRect(ox + s, oy + 2 * s, 2 * s, 2 * s);
            ctx.fillRect(ox + 3 * s, oy + 2 * s, 2 * s, 2 * s);

            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(ox + s + s + px, oy + 2 * s + s / 2 + py, s, s);
            ctx.fillRect(ox + 3 * s + s + px, oy + 2 * s + s / 2 + py, s, s);
        } else {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(ox + s, oy + 2 * s + s / 2, 2 * s, s);
            ctx.fillRect(ox + 3 * s, oy + 2 * s + s / 2, 2 * s, s);
        }

        // Nose
        ctx.fillStyle = '#f472b6';
        ctx.fillRect(ox + 2 * s, oy + 4 * s - 1, s, 1);
    }

    // ---- Main loop ----
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.25) spawnPixel();

        updateCat();

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            // Mouse repel
            if (mouseInCanvas) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.hypot(dx, dy);
                if (dist < 50 && dist > 0) {
                    const force = (50 - dist) / 50 * 0.6;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            }

            // Apply physics
            p.vx *= 0.95;
            p.vy *= 0.98;
            p.vy += 0.05; // gravity
            p.drift += p.wander;
            if (Math.random() < 0.02) p.wander = (Math.random() - 0.5) * 0.1;
            p.x += p.vx + p.drift;
            p.y += p.vy;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

            if (p.y > canvas.height) {
                particles.splice(i, 1);
            }
        }

        drawCat();

        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        const isMobile = IS_MOBILE();
        canvas.width = isMobile ? 70 : 120;
        canvas.height = isMobile ? 120 : window.innerHeight;
        canvas.style.height = isMobile ? '120px' : '100vh';
        canvas.style.width = isMobile ? '70px' : '120px';
    });

    loop();
})();
