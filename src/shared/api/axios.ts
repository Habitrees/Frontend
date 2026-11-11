import axios from "axios";

// The backend returns access JWT in JSON and sets refresh JWT in an HttpOnly cookie.
// Access is memory-only (cleared on reload); never store it in Web Storage.
let accessToken: string | null = null;
export function setAccessToken(token: string | null): void { accessToken = token; }
export function clearAccessToken(): void { accessToken = null; }

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const isPublicAuthRequest = /^\/auth\/(?:login\/|register\/|password-reset\/)/.test(config.url ?? "");
  if (accessToken && !isPublicAuthRequest) config.headers.set("Authorization", `Bearer ${accessToken}`);
  return config;
});
