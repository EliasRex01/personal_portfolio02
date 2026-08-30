import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ParticleBackground from './ParticleBackground.jsx';
import { useMagnetic } from '../hooks/useMagnetic.js';

/**
 * Hero
 * ----------------------------------------------------------------------
 * Uses a GSAP timeline (rather than CSS animations) for the entrance
 * sequence because a timeline lets us stagger multiple unrelated elements
 * (eyebrow -> title words -> subtitle -> CTA) off one shared clock with
 * precise overlap control (the `-=0.x` position offsets below), which is
 * exactly the kind of orchestration GSAP is built for.
 */
export default function Hero() {
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const magnetic = useMagnetic(0.4);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      // Title words animate in individually via the .word spans (staggered)
      .fromTo(
        titleRef.current.querySelectorAll('.word'),
        { opacity: 0, y: 40, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08 },
        '-=0.3'
      )
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.3');
  }, []);

  return (
    <header
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-8"
      style={{ perspective: '1000px' }}
    >
      <ParticleBackground />

      {/* Vignette + grid overlay to darken edges and sell the "3D floor" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, #08080c 85%),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 75%)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-3xl text-center">
        <p ref={eyebrowRef} className="mb-6 font-mono text-sm tracking-wide text-cyan">
          {'</> Full-Stack Developer & Creative Coder'}
        </p>

        <h1
          ref={titleRef}
          className="mb-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Each word is wrapped individually so GSAP can stagger them */}
          <span className="word inline-block">Building</span>{' '}
          <span className="word inline-block text-gradient">immersive</span>
          <br />
          <span className="word inline-block">digital</span>{' '}
          <span className="word inline-block">experiences.</span>
        </h1>

        <p ref={subtitleRef} className="mx-auto mb-10 max-w-xl text-lg text-text-dim">
          I design and build interactive, high-performance interfaces that sit
          somewhere between engineering and art — now with a chatbot that
          actually answers your questions.
        </p>

        <motion.a
          ref={(el) => {
            ctaRef.current = el;
            magnetic.ref.current = el;
          }}
          href="#work"
          data-hover
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          style={magnetic.style}
          className="inline-block animate-pulse-glow rounded-full bg-gradient-gold px-9 py-4 font-mono text-sm font-medium text-bg shadow-glow-gold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View My Work
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-faint">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <motion.i
            className="block h-2/5 w-full bg-gradient-to-b from-cyan to-transparent"
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </header>
  );
}
