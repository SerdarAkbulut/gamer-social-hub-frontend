import { toast } from "react-toastify";
import apiClient from "../client/apiClient";

interface User {
  userName: string;
  id: number;
}
export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
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

    return response.data;
  } catch (error) {
    throw error;
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

export const resetPassword = async (email: string) => {
  try {
    const response = await apiClient.post("/password-reset", { email });
    return response.data;
  } catch (error) {
    toast.error(error?.response.data);
  }
};
