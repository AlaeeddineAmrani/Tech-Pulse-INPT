// En Docker/Production : utilise VITE_API_URL ('/api')
// En développement local sans Docker (npm run dev) : bascule sur localhost:2500/api
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '${API_BASE_URL}' : '/api');