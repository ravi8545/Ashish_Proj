import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useCallbackForm } from '../hooks/useCallbackForm.js';

export default function CallbackForm({ className = '' }) {
  const { form, update, submit, status, error } = useCallbackForm();

  return (
    <form
      onSubmit={submit}
      className={`grid gap-4 self-center rounded-3xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-xl ${className}`}
    >
      <div>
        <p className="font-display text-xl">Request a Callback</p>
        <p className="mt-1 text-xs text-white/50">
          Drop your number and Ashish will personally reach out within 24 hours.
        </p>
      </div>

      <Field
        label="Your Name"
        placeholder="Enter your full name"
        value={form.name}
        onChange={update('name')}
        required
      />
      <Field
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={form.phone}
        onChange={update('phone')}
        required
      />

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
          Message <span className="lowercase text-white/30">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us a little about your project"
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent"
        />
      </div>

      {status === 'error' && error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Thanks! We will call you back shortly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Request Callback <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, ...props }) {
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
