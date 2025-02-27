"use client";

import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { likeGame } from "@/app/api/services/likedGames";
import LikeButton from "../../likeButtons/likeButtons";

interface PageProps {
  data: any;
  refetch: () => void; // ✅ refetch prop'unu ekledik
}

const CardList: React.FC<PageProps> = ({ data, refetch }) => {
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
            <div className="flex-col h-full">
              <LikeButton
                gameId={game.id}
                gameImage={game.cover_url}
                gameName={game.name}
                isLiked={game.isLiked}
              />
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
