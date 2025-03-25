"use client";
import { Avatar, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Following from "../following/following";
import Favorited from "../favorited/favorited";
import Liked from "../liked/liked";
import { useParams } from "next/navigation";
import UserPosts from "../posts/page";
import { useRecoilState } from "recoil";
import { profileBgImage } from "@/app/state/atoms";

function UserPage() {
  const [selectedOption, setSelectedOption] = useState("40");
  const [bgImage, setBgImage] = useRecoilState(profileBgImage);
  const params = useParams();
  const userId = params.userId.toString();

  const renderComponent = () => {
    switch (selectedOption) {
      case "10":
        return <Following userId={parseInt(userId)} />;
      case "20":
        return <Favorited userId={parseInt(userId)} />;
      case "30":
        return <Liked userId={parseInt(userId)} />;
      case "40":
        return <UserPosts userId={parseInt(userId)} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    setBgImage(
      "https://static.birgun.net/resim/haber/2024/04/20/netflix-acikladi-the-witcher-final-yapiyor.png"
    );
  }, []);

  return (
    <div className="mt-20 px-44  ">
      <div>
        <div className="flex justify-center">
          <div className=" ">
            <div className=" "></div>

            <div className=""></div>

            <div className="z-10 text-white flex flex-col  gap-4  p-5 bg-black bg-opacity-45 rounded-md">
              <div className="flex  justify-center mt-4 gap-2">
                <Stack>
                  <Avatar
                    alt="Profile"
                    src={"/profile.jpg"}
                    className="h-20 w-20"
                  />
                </Stack>
                <h1 className="text-3xl text-center flex self-center ">
                  Serdar asdsadaasdassadasdad
                </h1>
              </div>
              <div className="flex justify-center ">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  className="inline"
                >
                  Takip Et
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-end mr-5">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setSelectedOption("40")}
            sx={{ textTransform: "none" }}
          >
            Paylaşımlar
          </Button>
          <Button
            color="primary"
            variant="text"
            onClick={() => setSelectedOption("20")}
            sx={{ textTransform: "none" }}
          >
            Favori oyunlar
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setSelectedOption("30")}
            sx={{ textTransform: "none" }}
          >
            Beğendiği oyunlar
          </Button>
        </div>
        <div className="mt-4 ">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default UserPage;
