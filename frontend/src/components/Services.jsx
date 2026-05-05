import { motion } from 'framer-motion';
import { Heart, Megaphone, Music2, Calendar, ArrowUpRight } from 'lucide-react';

const items = [
  {
    icon: Heart,
    title: 'Wedding Films',
    desc: 'Timeless cinematic storytelling for the day you’ll never forget.',
  },
  {
    icon: Megaphone,
    title: 'Commercials',
    desc: 'Brand films, ads and product stories that move metrics and people.',
  },
  {
    icon: Music2,
    title: 'Music Videos',
    desc: 'Bold, narrative-driven visuals that turn songs into experiences.',
  },
  {
    icon: Calendar,
    title: 'Live Events',
    desc: 'Conferences, launches and live shows captured with a director’s eye.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      {/* ambient orange wash */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 mx-auto h-[30rem] w-[60%] rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="container-x relative">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="eyebrow mx-auto">What I Do</span>
          <h2 className="mt-5 section-title">
            Services <span className="gradient-text">Crafted</span> With
            Intention
          </h2>
          <p className="mt-5 text-white/60">
            Cinematic direction, on-set craft and post-production polish, end
            to end, under one obsessive eye.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="glass-card group p-7 transition-all duration-500 hover:border-accent/40 hover:shadow-glow"
            >
              {/* glow blob */}
              <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15 blur-2xl transition group-hover:bg-accent/30" />

              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink-900">
                <s.icon className="h-5 w-5" />
              </span>

              <h3 className="mt-6 font-head text-lg font-semibold uppercase tracking-wide text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {s.desc}
              </p>

              <div className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 transition group-hover:text-accent">
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
