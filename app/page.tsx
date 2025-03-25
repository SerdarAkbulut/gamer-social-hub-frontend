"use client";

import AllPost from "./components/mainpage/allpost";
import { Button } from "@mui/material";
import { useState } from "react";
import FollowGamesAndUser from "./components/mainpage/follow-games-user";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("10");

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
      default:
        return null;
    }
  };
  return (
    <div className="px-72 mt-32 flex flex-col gap-5">
      <div>
        <div className="flex gap-5 justify-end mr-5">
          <Button
            color="primary"
            variant="text"
            onClick={() => setSelectedOption("20")}
            sx={{ textTransform: "none" }}
          >
            Takip
          </Button>
          <Button
            color="primary"
            variant="text"
            onClick={() => setSelectedOption("30")}
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
