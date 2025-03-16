import UserContent from "@/app/components/card/user-content/userContent";
import React from "react";
interface GameDetailsProps {
  name: string;
  gamePosts: [];
}
debugger;
const GameDetailsComponent: React.FC<GameDetailsProps> = ({ gamePosts }) => {
  return (
    <div className="flex flex-col gap-5">
      {gamePosts.length > 0 ? (
        gamePosts.map((item, index) => (
          <UserContent
            postId={item.id}
            userName={item.user.userName}
            gameName={item.gameName}
            postText={item.postText}
            postTitle={item.postTitle}
            key={index}
          />
        ))
      ) : (
        <p className=" text-gray-500">
          Henüz herhangi bir gönderi bulunmamaktadır.
        </p>
      )}
    </div>
  );
};

export default GameDetailsComponent;
