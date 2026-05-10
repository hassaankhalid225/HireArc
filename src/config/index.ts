const getBackendUrl = () => {
  let url = process.env.NEXT_PUBLIC_BACKEND_URL || 
            process.env.NEXT_PUBLIC_API_URL || 
            "http://127.0.0.1:8000/api";
  
  // Ensure the URL has a protocol
  if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Ensure the URL ends with /api but avoid double /api
  if (url && !url.includes("/api")) {
    url = url.endsWith("/") ? `${url}api` : `${url}/api`;
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
