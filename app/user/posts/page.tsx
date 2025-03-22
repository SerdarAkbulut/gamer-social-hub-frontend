import { getUserPosts } from "@/app/api/services/userServices";
import UserContent from "@/app/components/card/user-content/userContent";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface UserProps {
  userId: number;
}

const UserPosts: React.FC<UserProps> = ({ userId }) => {
  const { data } = useQuery({
    queryKey: ["UserPosts"],
    queryFn: () => getUserPosts(userId),
  });
  console.log(data);
  return (
    <div className="flex flex-col gap-5">
      {data?.map((items, index) => (
        <>
          <UserContent
            gameName={items.gameName}
            postText={items.postText}
            postTitle={items.postTitle}
            gameId={items.gameId}
            userName={items.user.userName}
            userId={items.userId}
          />
        </>
      ))}
    </div>
  );
};

export default UserPosts;
