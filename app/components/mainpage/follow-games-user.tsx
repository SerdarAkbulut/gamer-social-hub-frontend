import { getFavoritedGamesPosts } from "@/app/api/services/postServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserContent from "../card/user-content/userContent";

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
      {data?.map((item: any, index: number) => (
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
