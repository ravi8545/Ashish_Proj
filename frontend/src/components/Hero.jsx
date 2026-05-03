import { motion } from 'framer-motion';
import { Play, ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="eyebrow">Photographer · Cinematographer</span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-7xl">
            Capturing <span className="italic text-accent">Stories</span>
            <br />
            Through Lens
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
            I’m Ashish — a visual storyteller crafting cinematic films and stills
            for weddings, brands and artists. Every frame, intentional. Every
            story, unforgettable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#portfolio" className="btn-primary">
              View Portfolio <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#showreel" className="btn-ghost group">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-ink-900 transition group-hover:scale-110">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Watch Showreel
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
                'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80',
                'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=120&q=80',
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-ink-900 object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white/60">
                Trusted by 120+ happy clients
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80"
              alt="Cinematic camera"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-800/80 p-4 backdrop-blur-xl"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Latest Project
                </p>
                <p className="font-display text-lg">Whispers of Forever</p>
              </div>
              <button className="grid h-11 w-11 place-items-center rounded-full bg-accent text-ink-900 transition hover:scale-110">
                <Play className="h-4 w-4 fill-current" />
              </button>
            </motion.div>
          </div>

          {/* stat card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-4 top-10 hidden rounded-2xl border border-white/10 bg-ink-800/80 p-4 backdrop-blur-xl sm:block"
          >
            <p className="font-display text-3xl text-accent">7+</p>
            <p className="text-xs text-white/60">Years of craft</p>
          </motion.div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="container-x mt-20">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 border-y border-white/5 py-6 text-sm uppercase tracking-[0.3em] text-white/30">
          <span>Sony Alpha</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>RED Komodo</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>DJI Ronin</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>DaVinci Resolve</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>Adobe Suite</span>
        </div>
      </div>
    </section>
  );
}
