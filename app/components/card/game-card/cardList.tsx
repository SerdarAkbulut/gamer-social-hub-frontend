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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-12">
      {data?.map((game: any, index: number) => (
        <Card
          key={index}
          className="flex flex-col border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        >
          <CardHeader
            subheader={game.name}
            className="text-lg font-bold text-gray-700 px-4 py-2"
          />

          <Link href={`/game/${game.id}`}>
            <CardMedia
              component="img"
              image={game?.cover_url}
              alt="Resim Bulunamadı"
              className="object-cover h-[300px] w-full "
            />
          </Link>

          <CardContent className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: like[game.id] ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <ThumbUpAltIcon
                  className={`cursor-pointer ${
                    game.isLiked ? "text-blue-500" : "text-gray-400"
                  }`}
                  onClick={() => {
                    liked({
                      gameId: game.id,
                      gameName: game.name,
                      gameImage: game.cover_url,
                      isLiked: true,
                    });
                    handleLike(game.id);
                  }}
                />
              </motion.div>

              <motion.div
                animate={{ scale: disLike[game.id] ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <ThumbDownAltIcon
                  className={`cursor-pointer ${
                    game.isLiked === false ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => {
                    liked({
                      gameId: game.id,
                      gameName: game.name,
                      gameImage: game.cover_url,
                      isLiked: false,
                    });
                    handleDisLike(game.id);
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              animate={{ scale: favorite[game.id] ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <FavoriteIcon
                className={`cursor-pointer ${
                  game.isFavorited ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => {
                  favorited({
                    gameId: game.id,
                    gameName: game.name,
                    gameImage: game.cover_url,
                    isFavorited: !game.isFavorited,
                  });
                  handleFavorite(game.id);
                }}
              />
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
