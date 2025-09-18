import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiClientMedia = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

apiClientMedia.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Yetkilendirme hatası! Kullanıcı çıkış yapıyor...");

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
