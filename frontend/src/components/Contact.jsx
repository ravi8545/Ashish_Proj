import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import CallbackForm from './CallbackForm.jsx';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 sm:p-12 lg:p-16"
        >
          <span className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <span className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Let’s Collaborate</span>
              <h2 className="mt-5 section-title">
                Have a story <br />
                worth <span className="gradient-text">filming?</span>
              </h2>
              <p className="mt-5 max-w-md text-white/60">
                Tell me a little about your project (wedding, brand, music
                video or event) and I’ll get back within 24 hours.
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href="mailto:ashishfaxe@gmail.com" className="hover:text-accent">
                    ashishfaxe@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href="tel:+919120708571" className="hover:text-accent">+91 91207 08571</a>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Delhi NCR · Mumbai · Available pan India
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://instagram.com/studioyorker"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-accent hover:text-accent"
                >
                  <Instagram className="h-3.5 w-3.5" /> @studioyorker
                </a>
                <a
                  href="https://instagram.com/cin.ashish"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-accent hover:text-accent"
                >
                  <Instagram className="h-3.5 w-3.5" /> @cin.ashish
                </a>
                <a
                  href="https://www.linkedin.com/in/ashish-maurya-121615271"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
            </div>

            <CallbackForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
