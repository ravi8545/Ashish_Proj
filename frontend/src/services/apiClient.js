// API base URL — set VITE_API_URL in .env to point to the backend.
export const API_BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000/api';

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no-op: non-JSON response */
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
