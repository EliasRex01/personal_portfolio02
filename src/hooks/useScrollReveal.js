import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal
 * ----------------------------------------------------------------------
 * Attaches a GSAP fade + slide-up animation to a ref, triggered once the
 * element scrolls into the viewport. Returns the ref to attach to your
 * JSX element. Centralizing this in a hook means every section (About,
 * Projects, Contact...) gets identical, easily-tunable reveal timing
 * instead of copy-pasted GSAP calls in every component.
 *
 * @param {object} options
 * @param {number} options.y        - starting vertical offset in px
 * @param {number} options.delay    - animation delay in seconds
 * @param {number} options.duration - animation duration in seconds
 */
export function useScrollReveal({ y = 40, delay = 0, duration = 0.9 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // fires when the element's top hits 85% down the viewport
            toggleActions: 'play none none none', // only ever plays forward, once
          },
        }
      );
    }, el);

    // Clean up GSAP context + associated ScrollTriggers on unmount, which
    // matters a lot in React since components can mount/unmount frequently.
    return () => ctx.revert();
  }, [y, delay, duration]);

  return ref;
}
