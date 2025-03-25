import React from "react";
import UserContent from "../card/user-content/userContent";
import { useQuery } from "@tanstack/react-query";
import { getallPost } from "@/app/api/services/postServices";

function AllPost() {
  const { data } = useQuery({
    queryKey: ["mainAllPosts"],
    queryFn: () => getallPost(),
  });
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

export default AllPost;
