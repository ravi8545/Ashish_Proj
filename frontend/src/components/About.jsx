import { motion } from 'framer-motion';
import { Award, Camera, Film, Users } from 'lucide-react';

const stats = [
  { icon: Award, value: '7+', label: 'Years Experience' },
  { icon: Film, value: '150+', label: 'Projects Delivered' },
  { icon: Users, value: '120+', label: 'Happy Clients' },
  { icon: Camera, value: '40+', label: 'Awards & Features' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80"
              alt="Photographer holding camera"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
          </div>

          <div className="absolute -right-4 bottom-10 hidden rounded-2xl border border-white/10 bg-ink-800/80 p-5 backdrop-blur-xl sm:block">
            <p className="font-display text-4xl text-accent">150+</p>
            <p className="text-xs uppercase tracking-widest text-white/60">
              Stories told
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <span className="eyebrow">About Ashish</span>
          <h2 className="mt-5 section-title">
            I Create Visual Stories <br />
            That <span className="italic text-accent">Inspire</span>
          </h2>

          <p className="mt-6 text-white/70 leading-relaxed">
            For nearly a decade, I’ve been chasing light, emotion and the kind of
            quiet moments most people miss. From intimate weddings in the
            mountains to high-energy commercial shoots in the city, my work lives
            at the intersection of cinema and authenticity.
          </p>
          <p className="mt-4 text-white/60 leading-relaxed">
            I believe great visuals aren’t just seen — they’re felt. Every
            project starts with a conversation, a mood, a soundtrack in my head,
            and ends with something you’ll want to watch again and again.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-accent/40"
              >
                <s.icon className="h-5 w-5 text-accent" />
                <p className="mt-3 font-display text-3xl">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
