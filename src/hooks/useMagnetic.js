import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * useMagnetic
 * ----------------------------------------------------------------------
 * Implements the "magnetic button" micro-interaction: as the cursor gets
 * close to an element, the element subtly shifts toward the cursor, as if
 * magnetically attracted. Framer Motion's `useSpring` wraps the raw motion
 * values so the follow motion feels bouncy/elastic rather than linear.
 *
 * Usage:
 *   const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(0.35);
 *   <motion.button ref={ref} style={style} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 *
 * @param {number} strength - 0..1, how strongly the element follows the cursor
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  // Raw (unsprung) offset values, updated directly on mousemove.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs smooth those raw values into elastic, bouncy motion.
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.3 });

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Distance of the cursor from the element's center.
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}
