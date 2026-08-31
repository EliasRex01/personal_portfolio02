import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const SKILLS = [
  { label: 'JavaScript (ES6+)', level: 95 },
  { label: 'React / Component Architecture', level: 92 },
  { label: 'CSS3 / Motion Design', level: 90 },
  { label: 'GSAP / Framer Motion', level: 85 },
  { label: 'Node.js / APIs', level: 82 },
];

const STATS = [
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 31, suffix: '+', label: 'Projects Shipped' },
  { value: 70, suffix: '+', label: 'Happy Clients' },
];

/** Animated count-up number, starts once it scrolls into view. */
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-cyan">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

/** A single animated skill bar — fills to `level`% once in view. */
function SkillBar({ label, level, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-6">
      <div className="mb-2 flex justify-between font-mono text-sm text-text-dim">
        <span>{label}</span>
        <span>{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className="h-full rounded-full bg-gradient-accent shadow-glow-violet"
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${level}%` : '0%' }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const headerRef = useScrollReveal({});
  const bioRef = useScrollReveal({ delay: 0.1 });
  const skillsRef = useScrollReveal({ delay: 0.2 });

  return (
    <section id="about" className="bg-bg-alt px-8 py-32">
      <div ref={headerRef} className="mx-auto mb-14 max-w-6xl">
        <span className="section-tag">01 — About</span>
        <h2 className="section-title">The person behind the pixels</h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-[1.1fr_0.9fr]">
        <div ref={bioRef}>
          <p className="mb-5 max-w-[52ch] text-text-dim">
            I'm a full-stack developer who treats the browser like a canvas.
            Over the last five years I've shipped products for startups and
            studios alike, always chasing the same goal: interfaces that feel
            alive without sacrificing an ounce of performance.
          </p>
          <p className="mb-5 max-w-[52ch] text-text-dim">
            My focus lately is interaction design —{' '}
            <em className="border-b border-violet not-italic text-text">
              the tactile details that make a screen respond to you
            </em>
            , specifically. GSAP timelines, Framer Motion springs, and a healthy
            respect for what a well-placed hover state can do.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="mt-1 font-mono text-xs text-text-faint">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={skillsRef}>
          <h3 className="mb-8 font-display text-xl">Technical Skills</h3>
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.label} index={i} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
