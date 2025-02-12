"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../../api/services/gameServices";
import CardList from "../../components/card/game-card/cardList";
import CategoryList from "@/app/components/navbar/category";

function GameList() {
  const params = useParams();
  const router = useRouter();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    router.push(`/games/${page}`);
  }, [page, router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", page],
    queryFn: () => getGames(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex justify-between">
      <div className="flex fixed left-0">
        <CategoryList />
      </div>
      <div className="ml-60">
        <CardList data={data} />
        <div className="flex justify-center my-4 gap-4">
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
    </div>
  );
}

export default GameList;
