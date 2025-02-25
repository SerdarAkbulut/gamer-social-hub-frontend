"use client";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { registerUser } from "../api/services/userServices";

function Register() {
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const saveUser = () => {
    registerUser(userName, email, password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-col border-[1px] border-gray-500  p-8 rounded-md shadow-lg">
        <div className="my-5">
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>
        <div className="flex flex-col gap-5">
          <TextField
            type="text"
            placeholder="user name"
            variant="filled"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></TextField>
          <TextField
            type="email"
            placeholder="email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            type="password"
            placeholder="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>
        <div className="mt-5 ">
          <Button
            onClick={() => saveUser()}
            variant="contained"
            className="text-white text-md font-bold bg-black"
            fullWidth
          >
            Sign up
          </Button>
          <div className="flex items-center justify-center w-full my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
