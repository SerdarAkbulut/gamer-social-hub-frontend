import { Input, TextField } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div className="bg-gray-500 text-white p-4 flex justify-between">
        <div>
          <a href="/">Ana Sayfa</a>
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            className="bg-white"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div>
            <a href="">Login</a>
          </div>
          <div>
            <a href="">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
