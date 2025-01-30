export const DEFAULT_HEADERS = (token?: string | null) => ({
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "ngrok-skip-browser-warning": "true",
});