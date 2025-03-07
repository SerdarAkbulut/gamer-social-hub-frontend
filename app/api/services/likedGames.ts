import apiClient from "../client/apiClient";

export const likeGame = async (
  gameId: number,
  gameName: string,
  gameImage: string,
  isLiked: boolean
) => {
  try {
    const response = await apiClient.post("/gameLike", {
      gameId,
      gameName,
      gameImage,
      isLiked,
    });

    return response.data; // Sunucudan dönen veriyi döndürüyoruz
  } catch (error) {
    console.error("Oyun beğenme işlemi başarısız:", error);
    throw error; // Hata yönetimi için hatayı yukarıya fırlat
  }
};

export const favoriteGame = async (
  gameId: number,
  gameName: string,
  gameImage: string,
  isFavorited: boolean
) => {
  try {
    const response = await apiClient.post("/favoriGames", {
      gameId,
      gameName,
      gameImage,
      isFavorited,
    });

    return response.data; // Sunucudan dönen veriyi döndürüyoruz
  } catch (error) {
    console.error("Oyun beğenme işlemi başarısız:", error);
    throw error; // Hata yönetimi için hatayı yukarıya fırlat
  }
};

export const myLikedGames = async () => {
  try {
    const response = await apiClient.get("likedGames");
    return response.data;
  } catch (error) {
    console.error("API Hatası:", error);
  }
};

export const myFavoritedGames = async () => {
  try {
    const response = await apiClient.get("favoritedGames");
    return response.data;
  } catch (error) {
    console.error("API Hatası:", error);
  }
};
