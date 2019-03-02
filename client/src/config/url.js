export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : `https://${window.location.hostname}/api`;
