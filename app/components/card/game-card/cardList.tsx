"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  duration,
} from "@mui/material";
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
    }) =>
      likeGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isLiked
      ),

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
    }) =>
      favoriteGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isFavorited
      ),
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
      {data?.map((game: any, index: number) => (
        <Card
          key={index}
          className="h-15 flex flex-col border-[1px] bg-slate-200"
        >
          <CardHeader subheader={game.name} className="h-20" />
          <Link href={`/game/${game.id}`}>
            <CardMedia
              component="img"
              image={game?.cover_url}
              alt="resim bulunamadı"
              className="mt-1 h-[300px]"
            />
          </Link>
          <CardContent className="flex gap-5">
            <div>
              <motion.div
                animate={{
                  scale: like[game.id]
                    ? game.isLiked === true
                      ? 0.7 // Eğer beğenildiyse küçült
                      : game.isLiked === false
                      ? 1.5 // Eğer beğenilmediyse büyüt
                      : 1.5 // Eğer isLiked null ise, biraz büyüt
                    : 1, // Varsayılan durumda normal boyutta kal
                }}
                transition={{ duration: 0.6, ease: "circInOut" }}
              >
                <ThumbUpAltIcon
                  className={`flex self-center hover:cursor-pointer ${
                    game.isLiked === true ? "text-blue-600" : ""
                  }`}
                  onClick={() => {
                    liked({
                      gameId: game.id,
                      gameName: game.name,
                      gameImage: game?.cover_url,
                      isLiked: true,
                    });
                    handleLike(game.id);
                  }}
                />
              </motion.div>
              <span className="text-gray-400 flex justify-center">50</span>
            </div>

            <div>
              <motion.div
                animate={{
                  scale: disLike[game.id]
                    ? game.isLiked === false
                      ? 1.5 // Eğer beğenildiyse küçült
                      : game.isLiked === true
                      ? 0.7 // Eğer beğenilmediyse büyüt
                      : 0.7 // Eğer isLiked null ise, biraz büyüt
                    : 1, // Varsayılan durumda normal boyutta kal
                }}
                transition={{ duration: 0.6, ease: "circInOut" }}
              >
                <ThumbDownAltIcon
                  className={`flex self-center hover:cursor-pointer ${
                    game.isLiked === false ? "text-red-600" : ""
                  }`}
                  onClick={() => {
                    liked({
                      gameId: game.id,
                      gameName: game.name,
                      gameImage: game?.cover_url,
                      isLiked: false,
                    });
                    handleDisLike(game.id);
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
                      favorited({
                        gameId: game.id,
                        gameName: game.name,
                        gameImage: game?.cover_url,
                        isFavorited: false,
                      });
                      handleFavorite(game.id);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    scale: favorite[game.id] ? [1, 2] : 1,
                  }}
                  transition={{ duration: 1, ease: "circInOut" }}
                >
                  <FavoriteIcon
                    className="flex justify-end hover:cursor-pointer text-gray-500"
                    onClick={() => {
                      favorited({
                        gameId: game.id,
                        gameName: game.name,
                        gameImage: game?.cover_url,
                        isFavorited: true,
                      });
                      handleFavorite(game.id);
                    }}
                  />
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
