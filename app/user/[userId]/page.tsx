"use client";
import { FormControl, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Following from "../following/following";
import Favorited from "../favorited/favorited";
import Liked from "../liked/liked";
import { useParams } from "next/navigation";
import UserPosts from "../posts/page";

function UserPage() {
  const [selectedOption, setSelectedOption] = useState("40");
  const params = useParams();
  const userId = params.userId.toString();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };
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

  return (
    <div className="mt-20 px-44 ">
      <div>
        <div className="bg-blue-600 text-white p-6 rounded-lg flex justify-between">
          <h1 className="text-3xl self-center">Serdar</h1>
          <button className="text-lg border-2 bg-red-700 rounded-md p-2 hover:bg-transparent ">
            Takip et
          </button>
        </div>
        <FormControl variant="standard" sx={{ minWidth: 120 }} className="mt-2">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedOption}
            onChange={handleChange}
            label="Seçenek"
          >
            <MenuItem value="40">Paylaşımlar</MenuItem>
            {/* <MenuItem value="10">Takip ettikleri</MenuItem> */}
            <MenuItem value="20">Favori oyunları</MenuItem>
            <MenuItem value="30">Beğendiği oyunlar</MenuItem>
          </Select>
        </FormControl>
        <div className="mt-4 ">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default UserPage;
