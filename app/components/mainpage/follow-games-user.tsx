import { getFavoritedGamesPosts } from "@/app/api/services/postServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserContent from "../card/user-content/userContent";

interface FollowGamesAndUserProps {
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

function FollowGamesAndUser() {
  const { data } = useQuery({
    queryKey: ["mainFavoritedAndUserPosts"],
    queryFn: () => getFavoritedGamesPosts(),
  });
  if (data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        Takip edilen oyuncu yada kullanıcı bulunamadı
      </div>
    );
  }
  return (
    <>
      {data?.map((item: FollowGamesAndUserProps, index: number) => (
        <>
          <UserContent
            key={index}
            gameId={item.gameId}
            gameName={item.gameName}
            postId={item.id}
            postText={item.postText}
            postTitle={item.postTitle}
            userId={item.userId}
            userName={item.user.userName}
          />
        </>
      ))}
    </>
  );
}

export default FollowGamesAndUser;
