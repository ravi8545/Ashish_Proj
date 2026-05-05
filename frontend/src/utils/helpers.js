/** Smoothly scroll to an element by id (handles "#id" or plain "id"). */
export function scrollToSection(target) {
  if (!target) return;
  const id = target.startsWith('#') ? target.slice(1) : target;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Conditionally join class names. */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
