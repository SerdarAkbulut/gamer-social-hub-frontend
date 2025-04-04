import { toast } from "react-toastify";
import apiClient, { apiClientMedia } from "../client/apiClient";

interface User {
  userName: string;
  id: number;
}
export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};

export const registerUser = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    const response = await apiClient.post("/register", {
      userName,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      toast.error(
        error.response.data.message ||
          "E-posta veya kullanıcı adı zaten kayıtlı",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      toast.error("Bir hata oluştu, lütfen tekrar deneyin.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    throw error; // Hata fırlatarak çağıran fonksiyonun da yakalamasını sağla
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });
    debugger;
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getUserFavoritedGames = async (userId: number) => {
  try {
    const response = await apiClient.get(`/userFavoritedGames/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserLikedGames = async (userId: number) => {
  try {
    const response = await apiClient.get(`/userLikedGames/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId: number) => {
  try {
    const response = await apiClient.get(`/user-posts/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  userName: string,
  email: string,
  currentPassword: string,
  password: string
) => {
  try {
    const response = await apiClient.put("/user", {
      userName,
      email,
      currentPassword,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response.data);
  }
};

export const forgotPassowrd = async (email: string) => {
  try {
    const response = await apiClient.post("/forgot-password", { email });
    toast.success(response.data.message);
    return response; // Başarıyla döndür
  } catch (error) {
    toast.error(error?.response?.data?.message || "Bilinmeyen hata");
    throw error.response ?? new Error("Bilinmeyen hata"); // Hata fırlat
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await apiClient.post("/reset-password", {
      token,
      newPassword,
    });
    toast.success(response.data.message);
    return response; // Başarıyla döndür
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error.response ?? new Error("Bilinmeyen hata"); // Hata fırlat
  }
};

export const uploadUserImage = async (file: Blob) => {
  try {
    const formData = new FormData();
    formData.append("file", file, "cropped-image.jpg");

    const response = await apiClientMedia.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    toast.error(error?.response.data);
    throw new Error("Resim yükleme başarısız.");
  }
};

export const checkPasswordResetToken = async (token: string) => {
  try {
    const response = await apiClient.get(
      `/check-reset-password-token/${token}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const savePost = async (postId: number) => {
  try {
    const response = await apiClient.post("/save-post", {
      postId: postId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserSavedPosts = async () => {
  try {
    const response = await apiClient.get("/get-saved-posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};
