import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

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
                worth <span className="italic text-accent">filming?</span>
              </h2>
              <p className="mt-5 max-w-md text-white/60">
                Tell me a little about your project — wedding, brand, music
                video or event — and I’ll get back within 24 hours.
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  hello@framebyashish.com
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Mumbai · Available worldwide
                </li>
              </ul>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid gap-4 self-center rounded-3xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-xl"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your Name" placeholder="Jane Doe" />
                <Field label="Email" type="email" placeholder="jane@email.com" />
              </div>
              <Field label="Project Type" placeholder="Wedding film, commercial…" />
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your story…"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent"
                />
              </div>
              <button type="submit" className="btn-primary justify-center">
                Send Inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, type = 'text', placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent"
      />
    </div>
  );
}
