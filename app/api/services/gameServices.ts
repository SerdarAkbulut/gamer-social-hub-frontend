import apiClient from "../client/apiClient";

export const getNewestGames = async (page: number) => {
  const response = await apiClient.get("/newestGames", {
    params: { page },
  });
  return response.data;
};

export const getSearch = async (q: string, page: number) => {
  const response = await apiClient.get("/search", {
    params: { q: q, page: page },
  });
  return response.data;
};
export const getGameDetails = async (id: number) => {
  const response = await apiClient.get("/gameDetails", {
    params: { id: id },
  });
  return response.data;
};
export const upcomingGames = async (page: number) => {
  const response = await apiClient.get("/upcomingGames", {
    params: { page },
  });
  return response.data;
};
export const getGenres = async () => {
  const response = await apiClient.get("/gameGenres");
  return response.data;
};
export const getThemes = async () => {
  const response = await apiClient.get("/gameThemes");
  return response.data;
};
