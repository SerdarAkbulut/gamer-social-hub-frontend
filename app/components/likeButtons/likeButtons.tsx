import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useMutation } from "@tanstack/react-query";
import { likeGame } from "@/app/api/services/likedGames";

interface GameProps {
  gameId: number;
  gameName: string;
  gameImage: string;
  isLiked: boolean;
}

const LikeButton = ({ gameId, gameName, gameImage, isLiked }: GameProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { mutate } = useMutation({
    mutationFn: (variables: {
      gameId: number;
      gameName: string;
      gameImage: string;
      isLiked: boolean;
    }) =>
      likeGame(
        variables.gameId,
        variables.gameName,
        variables.gameImage,
        variables.isLiked
      ),
    onSuccess: () => {
      // On success, you can add any further actions, such as refetching the data
    },
  });

  const handleLikeClick = () => {
    setIsButtonClicked(true); // Hızlı görsel değişiklik için
    mutate({
      gameId,
      gameName,
      gameImage,
      isLiked: !isLiked, // Beğenme durumu değişir
    });
  };

  return (
    <div className="flex justify-center gap-5">
      <div
        onClick={handleLikeClick}
        style={{
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: isButtonClicked || isLiked ? "blue" : "gray",
        }}
      >
        <ThumbUpAltIcon
          className={`transition-all ${isButtonClicked ? "scale-125" : ""}`}
        />
      </div>

      <div
        onClick={handleLikeClick}
        style={{
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: isButtonClicked || isLiked === false ? "red" : "gray",
        }}
      >
        <ThumbDownAltIcon
          className={`transition-all ${isButtonClicked ? "scale-125" : ""}`}
        />
      </div>
    </div>
  );
};

export default LikeButton;
