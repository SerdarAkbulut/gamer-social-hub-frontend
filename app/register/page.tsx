"use client";
import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

function Register() {
  const registerUser = () => {
    axios
      .post("http://localhost:3000/api/users/create", {
        userName: "serdar",
        email: "serdar61of@gmail.com",
        password: "test123",
      })
      .then((response) => {
        console.log("User registered successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error registering the user", error);
      });
  };

  return (
    <div>
      <Button onClick={() => registerUser()}>Test</Button>
    </div>
  );
}

export default Register;
