import { getOneCikanlar } from "@/app/api/services/postServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserContent from "../card/user-content/userContent";

function FeaturePosts() {
  const { data } = useQuery({
    queryKey: ["featurePosts"],
    queryFn: () => getOneCikanlar(),
  });

  return (
    <div className="flex flex-col gap-5">
      {data?.map((items: any, index: any) => (
        <UserContent
          userId={items.postDetails.userId}
          userName={items.postDetails.user.userName}
          key={index} // key eklemek önemli
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
