"use client";
import gamesApi from "@/app/api/client/games";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GameDetailsComponent from "./components/gameDetails";

function GameDetails() {
  const { data } = useQuery({
    queryKey: ["game"],
    queryFn: () => gamesApi.fetchGame(),
  });
  console.log(data);

  return (
    <div className="">
      <GameDetailsComponent name={data?.name} img={data?.background_image} />
    </div>
  );
}

export default GameDetails;
