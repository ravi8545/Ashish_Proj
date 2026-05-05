import { useState } from 'react';
import { callbackService } from '../services/callbackService.js';

/**
 * Encapsulates the "Request a Callback" submission flow:
 * input state, validation, async submit + status feedback.
 */
export function useCallbackForm(initial = { name: '', phone: '', message: '' }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const reset = () => {
    setForm(initial);
    setStatus('idle');
    setError(null);
  };

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const message = (form.message || '').trim();

    if (!name || !phone) {
      setStatus('error');
      setError('Name and phone are required.');
      return false;
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      setStatus('error');
      setError('Please enter a valid phone number.');
      return false;
    }

    try {
      setStatus('loading');
      setError(null);
      await callbackService.submit({ name, phone, message });
      setStatus('success');
      setForm(initial);
      return true;
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
      return false;
    }
  };

  return { form, update, submit, reset, status, error };
}
