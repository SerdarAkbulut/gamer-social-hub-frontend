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
  const [like, setLike] = useState<Record<number, boolean>>({});
  const [disLike, setDisLike] = useState<Record<number, boolean>>({});
  const [favorite, setFavorite] = useState<Record<number, boolean>>({});

  const { mutate: liked } = useMutation({
    mutationFn: (variables: {
      gameId: number;
      gameName: string;
      gameImage: string;
      isLiked: boolean;
    }) => {
      console.log("Liking game:", variables);
      return likeGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isLiked
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: favorited } = useMutation({
    mutationFn: (variables: {
      gameId: number;
      gameName: string;
      gameImage: string;
      isFavorited: boolean;
    }) => {
      console.log("Favoriting game:", variables);
      return favoriteGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isFavorited
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleLike = (gameId: number) => {
    setLike((prev) => ({ ...prev, [gameId]: true }));

    setTimeout(() => {
      setLike((prev) => ({ ...prev, [gameId]: false }));
    }, 700);
  };

  const handleDisLike = (gameId: number) => {
    setDisLike((prev) => ({ ...prev, [gameId]: true }));

    setTimeout(() => {
      setDisLike((prev) => ({ ...prev, [gameId]: false }));
    }, 700);
  };

  const handleFavorite = (gameId: number) => {
    setFavorite((prev) => ({ ...prev, [gameId]: true }));

    setTimeout(() => {
      setFavorite((prev) => ({ ...prev, [gameId]: false }));
    }, 700);
  };

  return (
    <div className="grid grid-cols-6 gap-5 mt-12">
      {data?.map((game: any, index: number) => {
        console.log("Game Object:", game); // game objesini kontrol et
        return (
          <Card
            key={index}
            className="h-15 flex flex-col border-[1px] bg-slate-200"
          >
            <CardHeader subheader={game.gameName} className="h-20" />
            <Link href={`/game/${game.id}`}>
              <CardMedia
                component="img"
                image={game?.gameImage}
                alt="resim bulunamadı"
                className="mt-1 h-[300px]"
              />
            </Link>
            <CardContent className="flex gap-5">
              <div>
                <motion.div
                  animate={{
                    scale: like[game.gameId]
                      ? game.isLiked === true
                        ? 0.7
                        : game.isLiked === false
                        ? 1.5
                        : 1.5
                      : 1,
                  }}
                  transition={{ duration: 0.6, ease: "circInOut" }}
                >
                  <ThumbUpAltIcon
                    className={`flex self-center hover:cursor-pointer ${
                      game.isLiked === true ? "text-blue-600" : ""
                    }`}
                    onClick={() => {
                      console.log("Liking Game:", game.gameId, game.gameName);
                      liked({
                        gameId: game.gameId,
                        gameName: game.gameName, // Burada doğru alanı kullanıyoruz
                        gameImage: game?.gameImage,
                        isLiked: true,
                      });
                      handleLike(game.gameId);
                    }}
                  />
                </motion.div>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>

              <div>
                <motion.div
                  animate={{
                    scale: disLike[game.gameId]
                      ? game.isLiked === false
                        ? 1.5
                        : game.isLiked === true
                        ? 0.7
                        : 0.7
                      : 1,
                  }}
                  transition={{ duration: 0.6, ease: "circInOut" }}
                >
                  <ThumbDownAltIcon
                    className={`flex self-center hover:cursor-pointer ${
                      game.isLiked === false ? "text-red-600" : ""
                    }`}
                    onClick={() => {
                      console.log(
                        "Disliking Game:",
                        game.gameId,
                        game.gameName
                      );
                      liked({
                        gameId: game.gameId,
                        gameName: game.gameName,
                        gameImage: game?.gameImage,
                        isLiked: false,
                      });
                      handleDisLike(game.gameId);
                    }}
                  />
                </motion.div>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>

              <div className="flex justify-end w-full">
                {game.isFavorited ? (
                  <motion.div>
                    <FavoriteIcon
                      className="flex justify-end hover:cursor-pointer text-red-500"
                      onClick={() => {
                        console.log("Removing from Favorites:", game.gameId);
                        favorited({
                          gameId: game.gameId,
                          gameName: game.gameName,
                          gameImage: game?.gameImage,
                          isFavorited: false,
                        });
                        handleFavorite(game.gameId);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: favorite[game.gameId] ? [1, 2] : 1,
                    }}
                    transition={{ duration: 1, ease: "circInOut" }}
                  >
                    <FavoriteIcon
                      className="flex justify-end hover:cursor-pointer text-gray-500"
                      onClick={() => {
                        console.log("Adding to Favorites:", game.gameId);
                        favorited({
                          gameId: game.gameId,
                          gameName: game.gameName,
                          gameImage: game?.gameImage,
                          isFavorited: true,
                        });
                        handleFavorite(game.gameId);
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CardList;
