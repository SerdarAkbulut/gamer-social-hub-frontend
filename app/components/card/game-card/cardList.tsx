"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { favoriteGame, likeGame } from "@/app/api/services/likedGames";
import { motion } from "framer-motion";
import { useState } from "react";

interface CardListProps {
  game: any;
  refetch: () => void;
  isHidden?: boolean;
}

const CardList: React.FC<CardListProps> = ({ game, refetch, isHidden }) => {
  const [likeState, setLikeState] = useState<boolean | null>(game.isLiked);
  const [favorite, setFavorite] = useState<boolean>(game.isFavorited);

  const { mutate: liked } = useMutation({
    mutationFn: () => likeGame(game.id, game.name, game.cover_url, likeState),
    onSuccess: () => refetch(),
  });

  const { mutate: favorited } = useMutation({
    mutationFn: () =>
      favoriteGame(game.id, game.name, game.cover_url, !favorite),
    onSuccess: () => refetch(),
  });

  return (
    <Card className="flex flex-col border-2 border-gray-300 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <CardHeader
        subheader={game.name}
        className="text-lg font-bold text-gray-700  py-2 h-16 "
      />
      <Divider />
      <Link href={`/game/${game.id ?? game.gameId}`}>
        <CardMedia
          component="img"
          image={game.cover_url}
          alt="Resim Bulunamadı"
          className="object-fill h-[320px] w-full "
        />
      </Link>
      {!isHidden && (
        <CardContent className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: likeState === true ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 1.0, ease: "circInOut" }}
            >
              <ThumbUpAltIcon
                className={`cursor-pointer ${
                  likeState === true ? "text-blue-500" : "text-gray-400"
                }`}
                onClick={() => {
                  const newLikeState = likeState === true ? null : true;
                  setLikeState(newLikeState);
                  liked();
                }}
              />
            </motion.div>

            <motion.div
              animate={{ scale: likeState === false ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 1.0, ease: "circInOut" }}
            >
              <ThumbDownAltIcon
                className={`cursor-pointer ${
                  likeState === false ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => {
                  const newLikeState = likeState === false ? null : false;
                  setLikeState(newLikeState);
                  liked();
                }}
              />
            </motion.div>
          </div>

          <motion.div
            animate={favorite ? { scale: [1, 1.8, 1] } : 1}
            transition={{ duration: 1.0, ease: "circInOut" }}
            className="ml-auto"
          >
            <FavoriteIcon
              className={`cursor-pointer ${
                favorite ? "text-red-500" : "text-gray-400"
              }`}
              onClick={() => {
                setFavorite((prev) => !prev);
                favorited();
              }}
            />
          </motion.div>
        </CardContent>
      )}
    </Card>
  );
};

export default CardList;
