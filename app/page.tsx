"use client";

import AllPost from "./components/mainpage/allpost";
import { Button } from "@mui/material";
import { useState } from "react";
import FollowGamesAndUser from "./components/mainpage/follow-games-user";
import FeaturePosts from "./components/mainpage/feature-posts";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("10");

  const handleButtonClick = (option: string) => {
    setSelectedOption((prev) => (prev === option ? "10" : option));
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "10":
        return (
          <div className="flex flex-col gap-5">
            <AllPost />
          </div>
        );
      case "20":
        return (
          <div className="flex flex-col gap-5">
            <FollowGamesAndUser />
          </div>
        );
      case "30":
        return (
          <div>
            <FeaturePosts></FeaturePosts>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-5 mt-32 flex flex-col gap-5 md:px-48 sm:px-20 lg:px-52 xl:px-72">
      <div>
        <div className="flex gap-5 justify-end mr-5">
          <Button
            color="primary"
            variant={selectedOption === "20" ? `contained` : `text`}
            onClick={() => handleButtonClick("20")}
            sx={{ textTransform: "none" }}
          >
            Takip
          </Button>
          <Button
            color="primary"
            variant={selectedOption === "30" ? `contained` : `text`}
            onClick={() => handleButtonClick("30")}
            sx={{ textTransform: "none" }}
          >
            Öne Çıkanlar
          </Button>
        </div>
        <div className="mt-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Page;
