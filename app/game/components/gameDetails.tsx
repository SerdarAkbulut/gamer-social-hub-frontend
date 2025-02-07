import UserContent from "@/app/components/card/user-content/userContent";
import React from "react";
interface GameDetailsProps {
  name: string;
}

const GameDetailsComponent: React.FC<GameDetailsProps> = ({}) => {
  return (
    <div className=" flex flex-col shadow-sm">
      <div className="flex justify-between">
        <div className=" flex w-full ">
          <UserContent />
        </div>
      </div>
    </div>
  );
};

export default GameDetailsComponent;
