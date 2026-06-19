export function getSiteUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://hipstersmoothie.com";
}
