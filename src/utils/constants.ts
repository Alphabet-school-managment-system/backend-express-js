export const TRUSTED_ORIGIN = [
  "http://localhost:3000",
  "https://alphabet-sms.vercel.app/",
];

export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? TRUSTED_ORIGIN[0] : TRUSTED_ORIGIN[1];
