"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GameDetailsComponent from "../components/gameDetails";
import { getGameDetails } from "@/app/api/services/gameServices";

function GameDetails(id: number) {
  const { data } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameDetails(id?.params?.gameId),
  });
  console.log(data);

  return (
    <div className=" px-52">
      <div className="bg-gray-600 p-5 text-white rounded-md">
        <h1 className="text-2xl ">{data?.name}</h1>
      </div>
      <div className="mt-5  flex ">
        <div className="w-full  ">
          <GameDetailsComponent name="" />
        </div>
        <div className="  mt-0 ml-5 flex flex-col bg-sky-100 p-5">
          {data?.tags?.map((gameTags, index) => (
            <>
              <span className="p-0 m-0" key={index}>
                {gameTags.name}
              </span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
