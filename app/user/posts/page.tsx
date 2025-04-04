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
  if (!data) return <p>Loading...</p>;
  if (data.length === 0) return <p>Paylaşılan gönderi bulunmamaktadır</p>;
  return (
    <div className="flex flex-col gap-5">
      {data?.map((items, index) => (
        <>
          <UserContent
            postId={items.id}
            gameName={items.gameName}
            postText={items.postText}
            postTitle={items.postTitle}
            gameId={items.gameId}
            userName={items.user.userName}
            userId={items.userId}
            key={index}
          />
        </>
      ))}
    </div>
  );
};

export default UserPosts;
