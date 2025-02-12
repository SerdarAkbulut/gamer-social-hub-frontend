"use client";

import { getGenres, getThemes } from "@/app/api/services/gameServices";
import { Box, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CategoryList: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getGenres(),
  });
  const { data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: () => getThemes(),
  });
  console.log(themes);
  return (
    <div className="w-1/2">
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
          {themes?.map((item, index) => (
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
export default CategoryList;
