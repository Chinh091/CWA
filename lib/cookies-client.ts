// Simple cookie helpers (client-side).
// AI disclosure: assisted by GPT-5.
export function setCookie(name: string, value: string, days = 120) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function getCookie(name: string): string | null {
  const key = encodeURIComponent(name) + "=";
  const parts = document.cookie.split(/;\s*/);
  for (const p of parts) {
    if (p.startsWith(key)) return decodeURIComponent(p.slice(key.length));
  }
  return null;
}
