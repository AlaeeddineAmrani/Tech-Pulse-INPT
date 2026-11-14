// 1. Docker  : VITE_API_URL vaut '/api' (injecté par le Dockerfile ARG)
// 2. Local   : DEV vaut true -> 'http://localhost:2500/api'
// 3. Vercel  : prod build sans VITE_API_URL -> '/api'
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:2500/api' : '/api');
