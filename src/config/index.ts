export const config = {
  APP_NAME: "HireArc",
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api",
  IS_DEV: process.env.NODE_ENV === "development",
};
