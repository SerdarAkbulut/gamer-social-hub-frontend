import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 📌 İstek Yapılmadan Önce Token'ı Ekleyelim
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

// 📌 API Hatalarını Yönetelim
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Yetkilendirme hatası! Kullanıcı çıkış yapıyor...");

        // 🔥 Token'ı localStorage'dan silebiliriz
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }

        // 🔄 Giriş sayfasına yönlendirme ekleyebiliriz (Next.js için)
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
