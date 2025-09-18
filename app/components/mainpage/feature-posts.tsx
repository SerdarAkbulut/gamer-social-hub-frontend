import { getOneCikanlar } from "@/app/api/services/postServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserContent from "../card/user-content/userContent";

interface FeaturePostsProps {
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
  postDetails: {
    gameId?: number;
    gameName?: string;
    userId: number;
    user: {
      userName: string;
    };
    id: number;
    postTitle: string;
    postText: string;
  };
}

function FeaturePosts() {
  const { data } = useQuery({
    queryKey: ["featurePosts"],
    queryFn: () => getOneCikanlar(),
  });

  return (
    <div className="flex flex-col gap-5">
      {data?.map((items: FeaturePostsProps, index: number) => (
        <UserContent
          userId={items.postDetails.userId}
          userName={items.postDetails.user.userName}
          key={index}
          postId={items.postDetails.id}
          gameId={items.postDetails.gameId}
          gameName={items.postDetails.gameName}
          postTitle={items.postDetails.postTitle}
          postText={items.postDetails.postText}
        />
      ))}
    </div>
  );
}

export default FeaturePosts;
