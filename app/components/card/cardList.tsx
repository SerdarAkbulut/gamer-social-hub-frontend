"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useQuery } from "@tanstack/react-query";
import gamesApi from "@/app/api/client/games";

interface PageProps {
  page: number;
}

const CardList: React.FC<PageProps> = ({ page }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", page],
    queryFn: () => gamesApi.fetchGames(page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }
  console.log(data);
  return (
    <div className="grid grid-cols-6 gap-5 mt-12 px-10">
      {data.map((game: any, index: number) => (
        <Card key={index} className="h-15 flex flex-col">
          <CardHeader title={game.name} className="h-20" />
          <a href={game}>
            <CardMedia
              component="img"
              image={game.background_image}
              alt="resim bulunamadı"
              className="flex self-center h-40 shadow-lg"
            />
          </a>
          <CardContent className="flex justify-between">
            <div className="flex gap-5">
              <div>
                <IconButton color="default" aria-label="home">
                  <ThumbUpAltIcon />
                </IconButton>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>
              <div>
                <IconButton color="default" aria-label="home">
                  <ThumbDownAltIcon />
                </IconButton>
                <span className="text-gray-400 flex justify-center">50</span>
              </div>
            </div>
            <Button variant="contained" size="small" endIcon={<FavoriteIcon />}>
              Takip et
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
