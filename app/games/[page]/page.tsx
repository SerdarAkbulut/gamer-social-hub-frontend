"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPopulerGames } from "../../api/services/gameServices";
import CardList from "../../components/card/game-card/cardList";

function GameList() {
  const params = useParams();
  const router = useRouter();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["games", page],
    queryFn: () => getPopulerGames(page),
  });
  useEffect(() => {
    router.push(`/games/${page}`);
    refetch();
  }, [page, router]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="px-32">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-12">
          {data?.map((game: any, index: number) => (
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
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default GameList;
