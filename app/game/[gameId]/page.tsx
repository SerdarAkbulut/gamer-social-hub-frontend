"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import GameDetailsComponent from "../components/gameDetails";
import { getGameDetails } from "@/app/api/services/gameServices";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import AllPosts from "@/app/components/card/posts/all-posts";
import { getallPost } from "@/app/api/services/postServices";

function GameDetails() {
  const router = useRouter();
  const params = useParams();
  const [gameId, setGameId] = useState<string | null>(null);

  // localStorage işlemlerini sadece tarayıcıda çalıştır
  useEffect(() => {
    if (typeof window !== "undefined" && params?.gameId) {
      localStorage.setItem("gameId", params.gameId.toString());
      setGameId(params.gameId); // gameId'yi state'e kaydet
    }
  }, [params?.gameId]);

  // gameId'yi number türüne dönüştürme
  const numberGameId = gameId
    ? parseInt(gameId.replace(/^"|"$/g, ""), 10)
    : null;

  const { data } = useQuery({
    queryKey: ["game", numberGameId],
    queryFn: () =>
      numberGameId ? getGameDetails(numberGameId) : Promise.resolve(null), // gameId null ise sorgu yapma
    enabled: !!numberGameId,
  });

  const { data: posts } = useQuery({
    queryKey: ["AllPosts"],
    queryFn: () => getallPost(),
  });

  const newForm = (gameName: string) => {
    localStorage.setItem("gameName", gameName.toString());
    router.push("/new-post");
  };

  return (
    <div className=" px-52 mt-20">
      {data?.map((game, index) => (
        <React.Fragment key={index}>
          <div className="bg-gray-600 p-5 text-white rounded-md flex justify-between">
            <h1 className="text-2xl ">{game?.name}</h1>
            <Button
              className="hover:none text-white"
              onClick={() => newForm(game?.name)}
            >
              Yeni Konu
            </Button>
          </div>
          <div className="flex justify-center gap-5 my-5">
            <div>
              <Button className="hover:bg-white">Forumlar</Button>
            </div>
            <div>
              <Button className="hover:bg-white">Videolar</Button>
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <div className="w-3/4">
              <GameDetailsComponent
                name={game?.name || ""}
                gamePosts={game.gamePosts}
              />
            </div>
            <div className="mt-0 ml-5 flex flex-col bg-sky-100 w-1/3 p-5 h-full rounded-md">
              {posts.map((item, index) => (
                <>
                  <div className="  gap-8 p-2">
                    <AllPosts
                      postText={item.postText}
                      postTitle={item.postTitle}
                      key={index}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default GameDetails;
