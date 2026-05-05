const getBackendUrl = () => {
  let url = process.env.NEXT_PUBLIC_BACKEND_URL || 
            process.env.NEXT_PUBLIC_API_URL || 
            "http://127.0.0.1:8000/api";
  
  // Ensure the URL has a protocol, otherwise browser treats it as a relative path
  if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Ensure the URL ends with /api for consistency with FastAPI routers
  if (url && !url.endsWith("/api") && !url.endsWith("/api/")) {
    url = url.endsWith("/") ? `${url}api` : `${url}/api`;
  }

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
  CLOUDINARY: {
    CLOUD_NAME: "dtsquhjhs",
    UPLOAD_PRESET: "hirearc_upload",
    UPLOAD_URL: "https://api.cloudinary.com/v1_1/dtsquhjhs/image/upload"
  },
  ASSETS: {
    GRAINY_BACKGROUND: "https://grainy-gradients.vercel.app/noise.svg"
  }
};
