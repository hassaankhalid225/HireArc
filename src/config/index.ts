const getBackendUrl = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || 
              process.env.NEXT_PUBLIC_API_URL || 
              "http://127.0.0.1:8000/api";
  
  // If we're on a Vercel domain and using localhost, it's likely a config error
  if (typeof window !== "undefined" && 
      window.location.hostname.includes("vercel.app") && 
      url.includes("127.0.0.1")) {
    console.error("⚠️ HireArc: NEXT_PUBLIC_BACKEND_URL is not set on Vercel. Falling back to localhost will fail.");
  }
  
  return url;
};

export const config = {
  APP_NAME: "HireArc",
  BACKEND_URL: getBackendUrl(),
  IS_DEV: process.env.NODE_ENV === "development",
};
