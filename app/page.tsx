"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import CardList from "./components/card/game-card/cardList";
import { useQuery } from "@tanstack/react-query";
import gamesApi from "./api/client/games";
import UserContent from "./components/card/user-content/userContent";

const Page = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", page],
    queryFn: () => gamesApi.fetchMainGames(page),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="px-52">
      <UserContent />
    </div>
  );
};

export default Page;
