// 1. Docker : VITE_API_URL vaut '/api' (injecté par le Dockerfile)
// 2. Local (npm run dev) : DEV vaut true -> 'http://localhost:2500/api'
// 3. Vercel (build prod sans VITE_API_URL) : '/_/backend/api'
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:2500/api' : '/_/backend/api');