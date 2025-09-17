import apiClient from "../client/apiClient";

export const follow = async (followingId: number) => {
  try {
    const response = await apiClient.post("/follow", {
      followingId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
