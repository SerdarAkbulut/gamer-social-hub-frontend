import { sortState } from "@/app/state/atoms";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";

function GenresComponent() {
  const [, setSort] = useRecoilState(sortState);
  const onChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  return (
    <div className="w-full">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Games</InputLabel>
        <Select label="Games" onChange={onChangeSort}>
          <MenuItem value="rating_count ">Populer</MenuItem>
          <MenuItem value="first_release_date ">Newest</MenuItem>
          <MenuItem>Upcoming</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default GenresComponent;
