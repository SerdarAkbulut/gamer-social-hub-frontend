"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { myLikedGames } from "@/app/api/services/likedGames";
import CardList from "../components/card/game-card/cardList";

function LikedGames() {
  const params = useParams();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["likedGames"],
    queryFn: () => myLikedGames(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="px-28 mt-28">
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

export default LikedGames;
