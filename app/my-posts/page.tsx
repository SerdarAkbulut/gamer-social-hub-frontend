"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMyPosts } from "../api/services/postServices";
import UserContent from "../components/card/user-content/userContent";

interface PostProps {
  gameId?: number;
  gameName?: string;
  postId?: number;
  postText?: string;
  postTitle?: string;
  userId?: number;
  userName?: string;
  id: number;
  user: {
    userName: string;
  };
}

function MyPosts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getMyPosts(),
  });

  return (
    <div className="mt-20 px-72">
      {data?.map((item: PostProps, index: number) => (
        <>
          <UserContent
            deletePost={true}
            postId={item.id}
            key={index}
            gameId={item.gameId}
            userId={item.userId}
            gameName={item.gameName}
            postText={item.postText}
            postTitle={item.postTitle}
          ></UserContent>
        </>
      ))}
    </div>
  );
}

export default MyPosts;
