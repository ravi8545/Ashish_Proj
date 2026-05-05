import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Play, ArrowRight } from 'lucide-react';

// Lazy-load the 3D scene so initial paint isn't blocked by three.js
const ThreeCamera = lazy(() => import('./three/ThreeCamera.jsx'));

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D camera background */}
      <div className="absolute inset-0 -z-0">
        <Suspense fallback={null}>
          <ThreeCamera className="absolute inset-0 h-full w-full" />
        </Suspense>
      </div>

      {/* cinematic vignettes & gradients */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,15,15,0.35)_55%,#0f0f0f_95%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-b from-transparent to-ink-900" />
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-0 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x relative z-10 py-28 sm:py-36">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="max-w-3xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="eyebrow"
          >
            StudioYorker · Photographer Ashish
          </motion.span>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mt-6 font-display text-6xl font-normal leading-[0.95] tracking-wide sm:text-7xl lg:text-[8.5rem]"
          >
            <span className="block text-white">Capturing</span>
            <span className="block">
              <span className="gradient-text text-glow">Stories</span>
            </span>
            <span className="block text-white/90">in Motion</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg"
          >
            I'm Ashish, a cinematographer and photographer crafting cinematic
            films and stills for brands, artists and the moments that matter.
            Based in Delhi NCR and Mumbai, working pan India.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#portfolio" className="btn-primary">
              View Portfolio <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#showreel" className="btn-ghost group">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-ink-900 transition group-hover:scale-110">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Watch Showreel
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-10 w-px animate-glow-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
