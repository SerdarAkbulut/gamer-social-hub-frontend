"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Following from "../following/following";
import Favorited from "../favorited/favorited";
import Liked from "../liked/liked";
import { useParams } from "next/navigation";
import UserPosts from "../posts/posts";
import { useRecoilState } from "recoil";
import { profileBgImage } from "@/app/state/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/api/services/userServices";
import { follow } from "@/app/api/services/followServices";

function UserPage() {
  const [selectedOption, setSelectedOption] = useState("40");
  const [, setBgImage] = useRecoilState(profileBgImage);
  const params = useParams();
  const userId = params.userId.toString();

  const { data, refetch } = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => getUser(parseInt(userId)),
  });

  const { mutate } = useMutation({
    mutationFn: () => follow(parseInt(userId)),
    onSuccess: (response) => {
      refetch();
      return response.data;
    },
  });

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
    <div className="px-5 mt-20 flex flex-col gap-5 md:px-48 sm:px-20 lg:px-52 xl:px-72">
      <div className="flex flex-col">
        <div className="flex justify-center h-32">
          <div className="w-full xl:w-1/3 lg:w1/3 md:w-1/2 relative h-full ">
            <div
              className=" w-full rounded-2xl bg-center bg-cover relative overflow-hidden h-28 shadow-xl "
              style={{
                backgroundImage: `url(${data?.user.banner})`,
                boxShadow:
                  " 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md z-0" />

              <div className="relative z-10 text-white flex flex-col items-center justify-center h-full gap-2">
                <h1 className="text-3xl font-semibold drop-shadow-md">
                  {data?.user.userName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            size="small"
            variant="outlined"
            onClick={() => mutate()}
            className="border border-blue-800 rounded-2xl"
          >
            {data?.isFollowing ? "Takipten çık" : "Takip Et"}
          </Button>
        </div>
        <div className="flex gap-5 justify-end mr-5 mt-5">
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => setSelectedOption("40")}
            sx={{ textTransform: "none" }}
          >
            Paylaşımlar
          </Button>
          <Button
            color="primary"
            variant="text"
            size="small"
            onClick={() => setSelectedOption("20")}
            sx={{ textTransform: "none" }}
          >
            Favori oyunlar
          </Button>
          <Button
            color="primary"
            size="small"
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
