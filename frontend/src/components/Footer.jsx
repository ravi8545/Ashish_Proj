import { Camera, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';
import { instagramFeed } from '../data/portfolio.js';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-900 pt-20">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        {/* brand */}
        <div className="lg:col-span-4">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/40">
              <Camera className="h-4 w-4 text-accent" />
            </span>
            <span className="font-display text-lg">
              Frame <span className="italic text-accent">by</span> Ashish
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm text-white/60">
            Cinematic photography & filmmaking for the moments that matter.
            Crafted in India · Delivered worldwide.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:bg-accent hover:text-ink-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* links */}
        <div className="lg:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.3em] text-white/40">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/70 transition hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* instagram preview */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/40">
              From Instagram
            </h4>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs text-accent hover:underline"
            >
              <Instagram className="h-3.5 w-3.5" /> @framebyashish
            </a>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
            {instagramFeed.map((src, i) => (
              <a
                key={i}
                href="#"
                className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink-900/0 opacity-0 transition group-hover:bg-ink-900/60 group-hover:opacity-100">
                  <Instagram className="h-5 w-5 text-accent" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Frame by Ashish. All rights reserved.</p>
          <p>Designed & Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}
