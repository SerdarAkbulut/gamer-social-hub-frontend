"use client";
import { useQuery } from "@tanstack/react-query";
import UserContent from "./components/card/user-content/userContent";
import gamesApi from "./api/client/games";
import { useState } from "react";
import CardList from "./components/card/game-card/cardList";

const Page = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", page],
    queryFn: () => gamesApi.fetchReleasedGames(page),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>Error</div>;
  }
  console.log(data);
  return (
    <div className="px-52">
      <UserContent />
      <CardList data={data} />
    </div>
  );
};

export default Page;
