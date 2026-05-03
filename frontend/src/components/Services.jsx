import { motion } from 'framer-motion';
import { Heart, Megaphone, Music2, Calendar } from 'lucide-react';

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
    title: 'Events',
    desc: 'Conferences, launches and live shows captured with a director’s eye.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow mx-auto">What I Do</span>
          <h2 className="mt-5 section-title">
            Services <span className="italic text-accent">Crafted</span> With
            Intention
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/25" />
              <s.icon className="h-7 w-7 text-accent" />
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40 transition group-hover:text-accent">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
