"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { registerUser } from "../api/services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: () => registerUser(userName, email, password),
    onSuccess: () => {
      router.push("/login"); // Kayıt başarılıysa login sayfasına yönlendir
    },
    onError: (error) => {
      console.error("Kayıt işlemi başarısız:", error);
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-col border-[1px] border-gray-500 p-8 rounded-md shadow-lg">
        <div className="my-5">
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>
        <div className="flex flex-col gap-5">
          <TextField
            type="text"
            placeholder="User name"
            variant="filled"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="email"
            placeholder="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Button
            onClick={() => {
              if (!userName || !email || !password) {
                alert("Lütfen tüm alanları doldurunuz!");
                return;
              }
              mutate();
            }}
            variant="contained"
            className="text-white text-md font-bold bg-black"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>
          {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
