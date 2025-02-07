import apiClient from "../client/apiClient";

export const getGames = async (page: number) => {
  const response = await apiClient.get("/games", {
    params: { page },
  });
  return response.data;
};

export const getSearch = async (q: string) => {
  const response = await apiClient.get("/search", {
    params: { q: q },
  });
  return response.data;
};
