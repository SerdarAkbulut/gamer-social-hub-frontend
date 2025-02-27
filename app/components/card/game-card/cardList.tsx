"use client";

import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { likeGame } from "@/app/api/services/likedGames";
import { motion } from "framer-motion";
import { useState } from "react";

interface PageProps {
  data: any;
  refetch: () => void;
}

const CardList: React.FC<PageProps> = ({ data, refetch }) => {
  const [like, setLike] = useState<Record<number, boolean>>({});

  const { mutate } = useMutation({
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

  const handleLike = (gameId: number) => {
    setLike((prev) => ({ ...prev, [gameId]: true }));

    setTimeout(() => {
      setLike((prev) => ({ ...prev, [gameId]: false }));
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
                animate={{ scale: like[game.id] ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <ThumbUpAltIcon
                  className={`flex self-center hover:cursor-pointer ${
                    game.isLiked ? "text-blue-600" : ""
                  }`}
                  onClick={() => {
                    mutate({
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
              <ThumbDownAltIcon
                className={`flex self-center hover:cursor-pointer ${
                  game.isLiked === false ? "text-red-600" : ""
                }`}
                onClick={() => {
                  mutate({
                    gameId: game.id,
                    gameName: game.name,
                    gameImage: game?.cover_url,
                    isLiked: false,
                  });
                }}
              />
              <span className="text-gray-400 flex justify-center">50</span>
            </div>

            <div className="flex justify-end w-full">
              <FavoriteIcon className="flex justify-end hover:cursor-pointer text-gray-500" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
