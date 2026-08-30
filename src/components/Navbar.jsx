import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-[1000] w-full transition-all duration-500 ${
        scrolled ? 'bg-bg/75 backdrop-blur-xl border-b border-border py-4' : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
        <a href="#home" data-hover className="font-display text-xl font-bold">
          E<span className="text-cyan">.</span>O
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-hover
                className="group relative font-mono text-sm text-text-dim transition-colors hover:text-text"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-accent transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="text-text md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-6 overflow-hidden bg-bg/95 py-8 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-lg text-text-dim hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
