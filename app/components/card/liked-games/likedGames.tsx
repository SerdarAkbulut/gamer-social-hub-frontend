"use client";

import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { favoriteGame, likeGame } from "@/app/api/services/likedGames";
import { motion } from "framer-motion";
import { useState } from "react";

interface PageProps {
  data: any;
  refetch: () => void;
}

const CardList: React.FC<PageProps> = ({ data, refetch }) => {
  const [gameStates, setGameStates] = useState<
    Record<number, { like?: boolean; dislike?: boolean; favorite?: boolean }>
  >({});

  const { mutate: liked } = useMutation({
    mutationFn: (variables: {
      gameId: number;
      gameName: string;
      gameImage: string;
      isLiked: boolean;
    }) =>
      likeGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isLiked
      ),
    onSuccess: refetch,
  });

  const { mutate: favorited } = useMutation({
    mutationFn: (variables: {
      gameId: number;
      gameName: string;
      gameImage: string;
      isFavorited: boolean;
    }) =>
      favoriteGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isFavorited
      ),
    onSuccess: refetch,
  });

  const handleLike = (gameId: number, gameName: string, gameImage: string) => {
    setGameStates((prev) => ({
      ...prev,
      [gameId]: {
        like: !prev[gameId]?.like,
        dislike: false,
        favorite: prev[gameId]?.favorite,
      },
    }));
    liked({ gameId, gameName, gameImage, isLiked: !gameStates[gameId]?.like });
  };

  const handleDislike = (
    gameId: number,
    gameName: string,
    gameImage: string
  ) => {
    setGameStates((prev) => ({
      ...prev,
      [gameId]: {
        dislike: !prev[gameId]?.dislike,
        like: false,
        favorite: prev[gameId]?.favorite,
      },
    }));
    liked({
      gameId,
      gameName,
      gameImage,
      isLiked: !gameStates[gameId]?.dislike,
    });
  };

  const handleFavorite = (
    gameId: number,
    gameName: string,
    gameImage: string
  ) => {
    setGameStates((prev) => ({
      ...prev,
      [gameId]: {
        favorite: !prev[gameId]?.favorite,
        like: prev[gameId]?.like,
        dislike: prev[gameId]?.dislike,
      },
    }));
    favorited({
      gameId,
      gameName,
      gameImage,
      isFavorited: !gameStates[gameId]?.favorite,
    });
  };

  return (
    <div className="grid grid-cols-6 gap-5 mt-12">
      {data?.map((game: any) => {
        const { like, dislike, favorite } = gameStates[game.id] || {};
        return (
          <Card
            key={game.id}
            className="h-15 flex flex-col border-[1px] bg-slate-200"
          >
            <CardHeader subheader={game.gameName} className="h-20" />
            <Link href={`/game/${game.id}`}>
              <CardMedia
                component="img"
                image={game?.gameImage || "/placeholder.jpg"}
                alt="resim bulunamadı"
                className="mt-1 h-[300px]"
              />
            </Link>
            <CardContent className="flex gap-5">
              {/* Beğeni Butonu */}
              <div>
                <motion.div
                  animate={{ scale: like ? 1.5 : dislike ? 0.7 : 1 }}
                  transition={{ duration: 0.6, ease: "circInOut" }}
                >
                  <ThumbUpAltIcon
                    className={`hover:cursor-pointer ${
                      like ? "text-blue-600" : "text-gray-400"
                    }`}
                    onClick={() =>
                      handleLike(game.id, game.gameName, game.gameImage)
                    }
                  />
                </motion.div>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>

              {/* Dislike Butonu */}
              <div>
                <motion.div
                  animate={{ scale: dislike ? 1.5 : like ? 0.7 : 1 }}
                  transition={{ duration: 0.6, ease: "circInOut" }}
                >
                  <ThumbDownAltIcon
                    className={`hover:cursor-pointer ${
                      dislike ? "text-red-600" : "text-gray-400"
                    }`}
                    onClick={() =>
                      handleDislike(game.id, game.gameName, game.gameImage)
                    }
                  />
                </motion.div>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>

              {/* Favori Butonu */}
              <div className="flex justify-end w-full">
                <motion.div
                  animate={{ scale: favorite ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 0.6, ease: "circInOut" }}
                >
                  <FavoriteIcon
                    className={`hover:cursor-pointer ${
                      favorite ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() =>
                      handleFavorite(game.id, game.gameName, game.gameImage)
                    }
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CardList;
