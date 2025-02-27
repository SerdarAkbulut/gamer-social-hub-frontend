"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { upcomingGames } from "../../api/services/gameServices";
import CardList from "../../components/card/game-card/cardList";

function GameList() {
  const params = useParams();
  const router = useRouter();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    router.push(`/games/${page}`);
  }, [page, router]);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["games", page],
    queryFn: () => upcomingGames(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="px-28">
        <CardList data={data} refetch={refetch} isFetching={isFetching} />
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
