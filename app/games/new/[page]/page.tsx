"use client";
import { getNewestGames } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function NewGames() {
  const params = useParams();
  const router = useRouter();

  const initialPage = Number(params.page) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["games", page],
    queryFn: () => getNewestGames(page),
  });
  useEffect(() => {
    refetch();
    router.push(`/games/new/${page}`);
  }, [page, router]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <div className="px-28">
        <CardList data={data} refetch={refetch} />
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

export default NewGames;
