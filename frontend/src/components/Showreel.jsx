import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Showreel() {
  return (
    <section id="showreel" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mx-auto">The Showreel</span>
          <h2 className="mt-5 section-title">
            A Reel of <span className="italic text-accent">Cinematic</span>{' '}
            Moments
          </h2>
          <p className="mt-4 text-white/60">
            Three minutes. A decade of obsession with light, motion and emotion.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="group relative aspect-video w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=80"
            alt="Showreel preview"
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
          />

          {/* dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.6))]" />

          {/* film bars */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-ink-900/90" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-ink-900/90" />

          {/* play button */}
          <button
            aria-label="Play showreel"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="relative grid h-24 w-24 place-items-center rounded-full bg-accent text-ink-900 shadow-[0_0_60px_-10px_rgba(245,158,11,0.7)] transition group-hover:scale-110 sm:h-28 sm:w-28">
              <Play className="h-8 w-8 fill-current sm:h-10 sm:w-10" />
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/60" />
            </span>
          </button>

          {/* timecode */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
            <span>REC · 00:00:00</span>
            <span className="hidden sm:inline">Showreel · 2025</span>
            <span>4K · 24fps</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
