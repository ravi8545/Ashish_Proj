import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { testimonials as seedTestimonials } from '../data/portfolioData.js';

const AUTOPLAY_MS = 6000;
const STORAGE_KEY = 'studioyorker_feedback_v1';

function loadStored() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Testimonials() {
  const [stored, setStored] = useState(loadStored);
  const all = useMemo(() => [...stored, ...seedTestimonials], [stored]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % all.length);
  const prev = () => setIndex((i) => (i - 1 + all.length) % all.length);

  useEffect(() => {
    if (paused || all.length <= 1 || showForm || showAll) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, all.length, showForm, showAll]);

  const current = all[index];

  const persist = (list) => {
    setStored(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  };

  const handleAdd = (entry) => {
    const next = [entry, ...stored];
    persist(next);
    setShowForm(false);
    setIndex(0);
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32"
      aria-label="Client feedback for StudioYorker"
    >
      <div className="container-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow mx-auto">Kind Words</span>
          <h2 className="mt-5 section-title">
            Loved By <span className="gradient-text">Clients</span>
          </h2>
          <p className="mt-4 text-white/60">
            Real feedback from couples, brands and artists across India. Share
            yours below.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-accent/5 blur-3xl" />

          <div className="glass-card relative px-6 py-12 sm:px-12 sm:py-14">
            <Quote className="absolute left-6 top-6 h-10 w-10 text-accent/30" />

            <div className="relative min-h-[14rem] sm:min-h-[12rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center"
                >
                  <blockquote className="mx-auto max-w-3xl font-head text-lg leading-relaxed text-white/85 sm:text-xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center justify-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star
                        key={k}
                        className={`h-4 w-4 ${
                          k < (current.rating ?? 5)
                            ? 'fill-current'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    {current.avatar ? (
                      <img
                        src={current.avatar}
                        alt={current.name}
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/40"
                      />
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 font-display text-lg text-accent ring-2 ring-accent/40">
                        {current.name?.[0] ?? '?'}
                      </span>
                    )}
                    <div className="text-left">
                      <p className="font-head font-semibold text-white">
                        {current.name}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-white/50">
                        {current.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                aria-label="Previous feedback"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:bg-accent hover:text-ink-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {all.slice(0, Math.min(all.length, 8)).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to feedback ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? 'w-8 bg-accent shadow-glow'
                        : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next feedback"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:bg-accent hover:text-ink-900"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" /> Share Your Feedback
            </button>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-ghost"
            >
              View All Feedback ({all.length})
            </button>
          </div>
        </div>
      </div>

      <FeedbackModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAdd}
      />
      <AllFeedbackModal
        open={showAll}
        onClose={() => setShowAll(false)}
        items={all}
      />
    </section>
  );
}

function FeedbackModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', role: '', quote: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ name: '', role: '', quote: '', rating: 5 });
      setSubmitted(false);
    }
  }, [open]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return;
    onSubmit({
      id: `local-${Date.now()}`,
      name: form.name.trim(),
      role: form.role.trim() || 'Client',
      quote: form.quote.trim(),
      rating: Number(form.rating) || 5,
      avatar: '',
    });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/80 px-4 py-10 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Share your feedback"
        >
          <motion.form
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-ink-900/95 p-7 shadow-glow-lg"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close feedback form"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-display text-2xl">Share Your Feedback</p>
            <p className="mt-1 text-xs text-white/50">
              Worked with StudioYorker? Tell us about your experience.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Thank you!</p>
                  <p className="mt-1 text-emerald-200/80">
                    Your feedback has been added and will appear in the carousel.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 btn-ghost !py-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                <Input
                  label="Your Name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
                <Input
                  label="Role / Company"
                  placeholder="Enter your role or company (optional)"
                  value={form.role}
                  onChange={update('role')}
                />
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
                    Your Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={form.quote}
                    onChange={update('quote')}
                    placeholder="Enter your feedback about working with StudioYorker"
                    required
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setForm((f) => ({ ...f, rating: n }))}
                        aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                        className="rounded-md p-1 transition hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            n <= form.rating
                              ? 'fill-accent text-accent'
                              : 'text-white/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary justify-center">
                  Submit Feedback <Send className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AllFeedbackModal({ open, onClose, items }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/85 px-4 py-10 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="All client feedback"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 shadow-glow-lg"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div>
                <p className="font-display text-xl">All Feedback</p>
                <p className="text-xs text-white/50">
                  {items.length} review{items.length === 1 ? '' : 's'} from clients
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close all feedback"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {items.map((t) => (
                  <motion.li
                    key={t.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center gap-3">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          loading="lazy"
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/30"
                        />
                      ) : (
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-display text-accent ring-2 ring-accent/30">
                          {t.name?.[0] ?? '?'}
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-widest text-white/40">
                          {t.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-accent">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star
                          key={k}
                          className={`h-3.5 w-3.5 ${
                            k < (t.rating ?? 5)
                              ? 'fill-current'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent"
      />
    </div>
  );
}
