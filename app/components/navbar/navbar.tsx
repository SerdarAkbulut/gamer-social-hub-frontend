"use client";

import gamesApi from "@/app/api/client/games";
import { categoryState } from "@/app/state/atoms";
import { Box, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilState } from "recoil";

const Navbar: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [cat, setCat] = useRecoilState(categoryState);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => gamesApi.fetchCategory(),
  });
  const allCategory = (e) => {
    console.log(e, "e");
  };
  return (
    <div className="  ">
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          className="h-96"
        >
          <Tab label="All" onClick={() => allCategory("all")} />
          {data?.map((item, index) => (
            <Tab
              label={item.name}
              value={item.name}
              key={index}
              onClick={() => allCategory(value)}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );
};
export default Navbar;
