import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/portfolio.js';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow mx-auto">Kind Words</span>
          <h2 className="mt-5 section-title">
            Loved By <span className="italic text-accent">Clients</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-accent/40"
            >
              <Quote className="h-8 w-8 text-accent/70" />
              <blockquote className="mt-4 text-white/80 leading-relaxed">
                “{t.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/40"
                />
                <div>
                  <figcaption className="font-medium">{t.name}</figcaption>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
