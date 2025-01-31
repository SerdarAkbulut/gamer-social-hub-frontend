"use client";
import React, { useState } from "react";
import CardList from "../components/card/game-card/cardList";
import { Button } from "@mui/material";
import CategoryList from "../components/navbar/category";
import { useQuery } from "@tanstack/react-query";
import gamesApi from "../api/client/games";

function GameList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", page],
    queryFn: () => gamesApi.fetchAllGames(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const today = new Date().toISOString().split("T")[0];

  debugger;
  const filteredGames = data?.filter((item) => item?.released <= today) || [];
  console.log(filteredGames);
  return (
    <div className="flex justify-between px-52">
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
