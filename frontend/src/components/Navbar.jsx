import { useEffect, useState } from 'react';
import { Menu, X, Aperture } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-900/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/40 transition group-hover:bg-accent/25">
            <Aperture className="h-4 w-4 text-accent" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl tracking-[0.22em] uppercase">
              Studio<span className="text-accent">Yorker</span>
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.45em] text-white/40">
              Photographer · Ashish
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-white/70 transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 hover:w-full group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden lg:inline-flex btn-primary !py-2.5">
          Hire Me
        </a>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-xl"
          >
            <ul className="container-x flex flex-col py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-white/80 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 justify-center"
              >
                Hire Me
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
