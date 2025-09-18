import { getUserFavoritedGames } from "@/app/api/services/userServices";
import CardList from "@/app/components/card/game-card/cardList";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface UserProps {
  userId: number;
}
interface GameProps {
  id: number;
  gameId?: number | undefined;
  name: string;
  cover_url: string;
  isLiked: boolean | null;
  isFavorited: boolean;
}
const Favorited: React.FC<UserProps> = ({ userId }) => {
  const { data, refetch } = useQuery({
    queryKey: ["userFavoritedGames"],
    queryFn: () => getUserFavoritedGames(userId),
  });

  if (!data) return <p>Loading...</p>; // Veriler gelene kadar yüklenme mesajı göster
  if (data.length === 0) return <p>Favori oyunlar bulunmamaktadır</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-12">
      {data.map((game: GameProps, index: number) => (
        <CardList key={index} game={game} refetch={refetch} isHidden={true} />
      ))}
    </div>
  );
};

export default Favorited;
