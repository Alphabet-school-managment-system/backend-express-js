export const TRUSTED_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://alphabet-sms.vercel.app/";
