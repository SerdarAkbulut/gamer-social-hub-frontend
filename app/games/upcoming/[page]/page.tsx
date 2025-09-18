"use client";
import { upcomingGames } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface GameProps {
  id: number;
  gameId?: number | undefined;
  name: string;
  cover_url: string;
  isLiked: boolean | null;
  isFavorited: boolean;
}
function UpcomingGames() {
  const params = useParams();
  const router = useRouter();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["games", page],
    queryFn: () => upcomingGames(page),
  });
  useEffect(() => {
    router.push(`/games/upcoming/${page}`);
    refetch();
  }, [page, router]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <div className="px-5 mt-20 flex flex-col gap-5 md:px-28 sm:px-20 lg:px-32 xl:px-44">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-5 mt-12">
          {data?.map((game: GameProps, index: number) => (
            <CardList key={index} game={game} refetch={refetch} />
          ))}
        </div>
        <div className="flex justify-center  gap-4 mt-5">
          <Button
            variant="contained"
            color="primary"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Geri
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((prev) => prev + 1)}
          >
            İleri
          </Button>
        </div>
      </div>
    </>
  );
}
export default UpcomingGames;
