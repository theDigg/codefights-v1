export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : `https://${window.location.hostname}:4000/api`;