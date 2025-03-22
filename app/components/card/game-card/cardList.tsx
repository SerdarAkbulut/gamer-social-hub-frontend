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
import { useRouter } from "next/navigation";

interface CardListProps {
  game: any;
  refetch: () => void;
  isHidden?: boolean;
}

const CardList: React.FC<CardListProps> = ({ game, refetch, isHidden }) => {
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { mutate: liked } = useMutation({
    mutationFn: () =>
      likeGame(game.id, game.name, game.cover_url, !game.isLiked),
    onSuccess: () => refetch(),
  });

  const { mutate: favorited } = useMutation({
    mutationFn: () =>
      favoriteGame(game.id, game.name, game.cover_url, !game.isFavorited),
    onSuccess: () => refetch(),
  });

  return (
    <Card className="flex flex-col border-2 border-gray-300 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <CardHeader
        subheader={game.name}
        className="text-lg font-bold text-gray-700 px-4 py-2"
      />
      <Divider />
      <Link href={`/game/${game.id ?? game.gameId}`}>
        <CardMedia
          component="img"
          image={game.cover_url}
          alt="Resim Bulunamadı"
          className="object-fill h-[320px] w-full"
        />
      </Link>
      {!isHidden ? (
        <CardContent className="flex items-center gap-3 px-4 py-3">
          <motion.div
            animate={{ scale: like ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <ThumbUpAltIcon
              className={`cursor-pointer ${
                game.isLiked ? "text-blue-500" : "text-gray-400"
              }`}
              onClick={() => {
                liked();
                setLike(true);
                setTimeout(() => setLike(false), 700);
              }}
            />
          </motion.div>

          <motion.div
            animate={{ scale: disLike ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <ThumbDownAltIcon
              className={`cursor-pointer ${
                game.isLiked === false ? "text-red-500" : "text-gray-400"
              }`}
              onClick={() => {
                liked();
                setDisLike(true);
                setTimeout(() => setDisLike(false), 700);
              }}
            />
          </motion.div>

          <motion.div
            animate={{ scale: favorite ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
            className="ml-auto"
          >
            <FavoriteIcon
              className={`cursor-pointer  ${
                game.isFavorited ? "text-red-500" : "text-gray-400"
              }`}
              onClick={() => {
                favorited();
                setFavorite(true);
                setTimeout(() => setFavorite(false), 700);
              }}
            />
          </motion.div>
        </CardContent>
      ) : (
        ""
      )}
    </Card>
  );
};

export default CardList;
