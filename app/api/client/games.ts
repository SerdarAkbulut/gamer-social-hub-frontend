import axios from "axios";

const apiKey = "d7e0fab152854451a388218c599cc5b2";

const fetchMainGames = async (page: number) => {
  const response = await axios.get("https://api.rawg.io/api/games?", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      page_size: 24,
      page: page,
      ordering: "-released",
      dates: `1950-01-01,${today}`,
      publishers:
        "electronic-arts,microsoft-studios,square-enix,ubisoft,sega,valve-corporation,capcom,2k-games,sony-interactive-entertainment,paradox-interactive,sega,sony-computer-entertainment,activision-blizzard,konami,blizzard-entertainment,rockstar-games",
    },
  });
  return response.data.results;
};
const today = new Date().toISOString().split("T")[0]; // Bugünün tarihini al
const fetchAllGames = async (page: number) => {
  const response = await axios.get("https://api.rawg.io/api/games", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      page_size: 24,
      page: page,
      ordering: "-released",
    },
  });
  return response.data.results;
};

const fetchReleasedGames = async (page: number) => {
  const response = await axios.get("https://api.rawg.io/api/games", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: apiKey,
      page_size: 24,
      page: page,
      ordering: "-released",
      dates: `1950-01-01,${today}`,
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

const fetchGame = async (id: number) => {
  const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
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
  fetchMainGames,
  fetchCategory,
  fetchGame,
  fetchSearchGames,
  fetchAllGames,
  fetchReleasedGames,
};

export default gamesApi;
