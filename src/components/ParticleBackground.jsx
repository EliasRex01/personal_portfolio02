import { useEffect, useRef } from 'react';

/**
 * ParticleBackground
 * ----------------------------------------------------------------------
 * A dependency-free 2D canvas particle field simulating 3D depth (no
 * WebGL/Three.js). Every particle carries a `z` value from 0 (far) to 1
 * (near) which drives its size, brightness, and how strongly it shifts
 * with mouse-parallax — nearer particles move more, exactly like a real
 * multi-plane parallax camera would behave.
 *
 * Implemented as a plain <canvas> driven by requestAnimationFrame inside
 * a useEffect, with all mutable simulation state kept in refs so the
 * animation loop never triggers React re-renders.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height, particles, rafId;
    const PARTICLE_COUNT = 110;
    const MAX_LINK_DISTANCE = 130;
    const parallax = { x: 0, y: 0 };

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.002,
      }));
    }

    function updateParticle(p) {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      if (p.z <= 0.05 || p.z >= 1) p.vz *= -1;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Connective "constellation" lines between nearby particles.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK_DISTANCE) {
            const avgDepth = (a.z + b.z) / 2;
            const opacity = (1 - dist / MAX_LINK_DISTANCE) * avgDepth * 0.35;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        updateParticle(p);
        const parallaxStrength = 18 * p.z;
        const drawX = p.x + parallax.x * parallaxStrength;
        const drawY = p.y + parallax.y * parallaxStrength;
        const radius = p.z * 2.2 + 0.4;
        const isCyan = p.x % 2 > 1;
        const color = isCyan ? '34, 211, 238' : '139, 92, 246';

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${0.25 + p.z * 0.6})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e) {
      parallax.x = (e.clientX / window.innerWidth - 0.5) * 2;
      parallax.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
