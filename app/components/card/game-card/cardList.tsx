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

import Link from "next/link";
interface PageProps {
  data: any;
}

const CardList: React.FC<PageProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="grid grid-cols-6 gap-5 mt-12 px-10">
      {data?.map((game: any, index: number) => (
        <Card key={index} className="h-15 flex flex-col">
          <CardHeader subheader={game.name} className="h-20 " />
          <Link href={`/games/game/${game.id}`}>
            <CardMedia
              component="img"
              image={game?.cover_url}
              alt="resim bulunamadı"
              className=""
            />
          </Link>
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
