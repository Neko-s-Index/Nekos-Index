(() => {
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
    canvas.style.opacity = '0.55';
    canvas.style.imageRendering = 'pixelated';
    canvas.width = 120;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    if (window.innerWidth < 768) {
        canvas.style.width = '70px';
        canvas.style.height = '120px';
        canvas.width = 70;
        canvas.height = 120;
    }

    const ctx = canvas.getContext('2d');
    const colors = [
        '#3b82f6', // blue
        '#8b5cf6', // purple
        '#f472b6', // pink
        '#22c55e', // green
        '#f59e0b', // amber
        '#06b6d4'  // cyan
    ];
    const pixels = [];

    function spawnPixel() {
        const size = Math.random() > 0.7 ? 5 : 3;
        pixels.push({
            x: Math.random() * canvas.width,
            y: -10,
            size: size,
            speed: Math.random() * 1.8 + 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.7 + 0.2,
            drift: (Math.random() - 0.5) * 0.6
        });
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.25) spawnPixel();

        for (let i = pixels.length - 1; i >= 0; i--) {
            const p = pixels[i];
            p.y += p.speed;
            p.x += p.drift;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

            if (p.y > canvas.height) {
                pixels.splice(i, 1);
            }
        }

        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;
        canvas.width = isMobile ? 70 : 120;
        canvas.height = isMobile ? 120 : window.innerHeight;
        canvas.style.height = isMobile ? '120px' : '100vh';
    });

    loop();
})();
