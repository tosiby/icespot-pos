const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'const API = "https://ice-spot-backend.onrender.com/api"';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ice_spot_token');
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}
