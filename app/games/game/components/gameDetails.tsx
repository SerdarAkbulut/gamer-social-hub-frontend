import React from "react";
interface GameDetailsProps {
  name: string;
  img: string;
  gameTags: GameTags;
}
interface GameTags {
  name: string;
}
const GameDetailsComponent: React.FC<GameDetailsProps> = ({
  name,
  img,
  gameTags,
}) => {
  return (
    <div className="ml-60 mt-20">
      <h1>{name}</h1>
      <img src={img} alt="resim" className="w-3/4" />
    </div>
  );
};

export default GameDetailsComponent;
