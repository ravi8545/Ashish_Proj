import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { cx } from '../utils/helpers.js';

export default function Portfolio() {
  const {
    filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    loading,
  } = usePortfolio();

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-5 section-title">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="mt-4 max-w-lg text-white/60">
              A curated selection of recent films and photo stories across
              weddings, brands, music and live events.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cx(
                  'rounded-full border px-4 py-2 text-sm transition',
                  activeCategory === c
                    ? 'border-accent bg-accent text-ink-900'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-accent/50 hover:text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {!loading &&
              filteredProjects.map((p, i) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={cx(
                    'group relative overflow-hidden rounded-3xl ring-1 ring-white/10',
                    i % 5 === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
                  )}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent opacity-90 transition group-hover:opacity-100" />

                  <a
                    href={p.video || '#'}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Play ${p.title}`}
                    className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"
                  >
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-accent text-ink-900">
                      <Play className="h-5 w-5 fill-current" />
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/70" />
                    </span>
                  </a>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-accent">
                        {p.category}
                      </p>
                      <h3 className="mt-1 font-display text-xl text-white sm:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition group-hover:border-accent group-hover:bg-accent group-hover:text-ink-900"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>

        {loading && (
          <p className="mt-12 text-center text-sm text-white/50">
            Loading featured work...
          </p>
        )}

        {!loading && filteredProjects.length === 0 && (
          <p className="mt-12 text-center text-sm text-white/50">
            No projects in this category yet.
          </p>
        )}

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-ghost">
            Explore Full Archive <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
