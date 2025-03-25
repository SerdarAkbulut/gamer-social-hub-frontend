"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";

import GameDetailsComponent from "../components/gameDetails";

import { getGameDetails } from "@/app/api/services/gameServices";

const GameDetails = () => {
  const router = useRouter();
  const params = useParams();
  const gameId = params?.gameId ? parseInt(params.gameId, 10) : null;

  useEffect(() => {
    if (typeof window !== "undefined" && gameId) {
      localStorage.setItem("gameId", gameId.toString());
    }
  }, [gameId]);

  const { data: gameDetails } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => (gameId ? getGameDetails(gameId) : Promise.resolve(null)),
    enabled: !!gameId,
  });

  const handleNewPost = (gameName: string) => {
    localStorage.setItem("gameName", gameName);
    router.push("/new-post");
  };

  return (
    <div className="px-72 mt-20 ">
      {gameDetails?.map((game, index) => (
        <div key={index} className="space-y-6">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 text-white rounded-lg flex justify-between items-center shadow-lg">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNewPost(game.name)}
            >
              Yeni Konu
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <Button variant="outlined" className="hover:bg-gray-100 transition">
              Forumlar
            </Button>
            <Button variant="outlined" className="hover:bg-gray-100 transition">
              Videolar
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <GameDetailsComponent
                name={game.name}
                gamePosts={game.gamePosts}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameDetails;
