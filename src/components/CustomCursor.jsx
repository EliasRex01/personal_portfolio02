import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor
 * ----------------------------------------------------------------------
 * Two-part cursor: a small dot that snaps to the pointer instantly, and a
 * larger ring driven through Framer Motion's `useSpring`, which produces
 * the "lag/spring" trailing effect for free (no manual lerp loop needed —
 * Framer's spring physics handle the easing every frame internally).
 *
 * The ring also grows + glows whenever the pointer enters any element
 * carrying `data-hover`, toggled via a delegated mouseover/mouseout
 * listener on `document` rather than one listener per interactive element.
 */
export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Springs give the outline ring its elastic, lagging follow motion.
  const ringX = useSpring(dotX, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 30, mass: 0.6 });

  const [isActive, setIsActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    setIsTouch(touchQuery.matches);
    if (touchQuery.matches) return; // skip all cursor logic on touch devices

    function handleMove(e) {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    }

    function handleOver(e) {
      if (e.target.closest('[data-hover]')) setIsActive(true);
    }
    function handleOut(e) {
      if (e.target.closest('[data-hover]')) setIsActive(false);
    }

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [dotX, dotY]);

  if (isTouch) return null;

  return (
    <>
      {/* Solid dot — glued to the real pointer position */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-cyan shadow-glow-cyan pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Outline ring — lags behind via spring physics, grows on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-violet pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isActive ? 60 : 36,
          height: isActive ? 60 : 36,
          backgroundColor: isActive ? 'rgba(139,92,246,0.35)' : 'rgba(139,92,246,0)',
          borderColor: isActive ? '#22d3ee' : '#8b5cf6',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
}
