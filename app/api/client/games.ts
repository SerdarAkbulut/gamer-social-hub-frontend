import axios from "axios";

const apiKey = "d7e0fab152854451a388218c599cc5b2";

const fetchGames = async (page: number) => {
  const response = await axios.get("https://api.rawg.io/api/games?", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      page_size: 24,
      page: page,
    },
  });
  return response.data.results;
};

const fetchCategory = async () => {
  const response = await axios.get("https://api.rawg.io/api/genres", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      ordering: "name",
    },
  });
  return response.data.results;
};

const fetchSearchGames = async (
  page: number,
  name: string,
  category: string
) => {
  const response = await axios.get("https://api.rawg.io/api/games?", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      page_size: 24,
      page: page,
      search: name,
      genres: category,
    },
  });
  return response.data.results;
};

const fetchGame = async () => {
  const response = await axios.get("https://api.rawg.io/api/games/303576", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
    },
  });
  return response.data;
};
const gamesApi = {
  fetchGames,
  fetchCategory,
  fetchGame,
};

export default gamesApi;
