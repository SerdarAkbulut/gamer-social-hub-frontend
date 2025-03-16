import apiClient from "../client/apiClient";

export const newPost = async (
  gameId: number,
  gameName: string,
  postTitle: string,
  postText: string
) => {
  try {
    const response = await apiClient.post("/newpost", {
      gameId,
      gameName,
      postTitle,
      postText,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallPost = async () => {
  try {
    const response = await apiClient.get("/post");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGamePosts = async (gameId: number) => {
  try {
    const response = await apiClient.post("/gameposts", {
      params: { gameId },
    });
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    throw new Error("Veri alınırken bir hata oluştu.");
  }
};

export const getFavoritedGamesPosts = async () => {
  try {
    const response = await apiClient.get("/favoritedGamesPost");
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
    throw new Error("Veri alınırken bir hata oluştu.");
  }
};

export const getPostDetails = async (postId: number) => {
  try {
    const response = await apiClient.get(`/post-details/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Veri alınırken bir hata oluştur");
  }
};
