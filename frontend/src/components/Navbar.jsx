import { useEffect, useState } from 'react';
import { Menu, X, Camera } from 'lucide-react';
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-900/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/40 transition group-hover:bg-accent/25">
            <Camera className="h-4 w-4 text-accent" />
          </span>
          <span className="font-display text-lg tracking-wide">
            Frame <span className="italic text-accent">by</span> Ashish
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
            className="lg:hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-xl"
          >
            <ul className="container-x flex flex-col py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-white/80 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
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
    </header>
  );
}
