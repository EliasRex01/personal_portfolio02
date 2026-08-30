import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * ProjectCard
 * ----------------------------------------------------------------------
 * The 3D tilt is built from two raw motion values (mouseX/mouseY, -0.5..0.5
 * relative to the card) that feed `useTransform` to compute rotateX/rotateY,
 * then each is wrapped in `useSpring` so the tilt eases in AND eases back
 * to flat on mouse-leave with real spring physics rather than a linear CSS
 * transition. The radial glow reuses the same raw values (as percentages)
 * for its background-position, keeping light + tilt perfectly in sync.
 */
export default function ProjectCard({ number, title, description, tags, index }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-9"
    >
      {/* Cursor-tracking radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${glowX} ${glowY}, rgba(139,92,246,0.35), transparent 60%)`,
        }}
      />

      {/* Content is pushed "forward" in 3D space for a genuine parallax pop */}
      <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
        <span className="mb-4 block font-mono text-xs text-text-faint">{number}</span>
        <h3 className="mb-3 font-display text-xl font-semibold">{title}</h3>
        <p className="mb-6 text-sm text-text-dim">{description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan/25 bg-cyan/[0.08] px-3 py-1 font-mono text-[0.72rem] text-cyan"
            >
              {tag}
            </span>
          ))}
        </div>

        <a href="#" data-hover className="inline-flex items-center gap-1 font-mono text-sm font-medium">
          View Project
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </motion.article>
  );
}
