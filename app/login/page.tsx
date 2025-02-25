"use client";
import React, { useEffect, useState } from "react";
import { loginUser } from "../api/services/userServices";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("token_expiry");

      if (storedToken && tokenExpiry) {
        const now = new Date().getTime();
        if (now > Number(tokenExpiry)) {
          localStorage.removeItem("token");
          localStorage.removeItem("token_expiry");
        } else {
          setToken(storedToken);
          router.push("/");
        }
      }
    }
  }, []);

  function saveToken(token, timeout) {
    const now = new Date().getTime();
    const expiresAt = now + timeout * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiry", expiresAt.toString());
  }

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (response) => {
      if (response?.token) {
        const timeOut = 30 * 24 * 60 * 60;
        saveToken(response.token, timeOut);
        setToken(response.token);
        router.push("/");
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-col border-[1px] border-gray-500 p-8 rounded-md shadow-lg">
        <div className="my-5">
          <h1 className="text-2xl font-bold">Sign in</h1>
        </div>
        <div className="flex flex-col gap-5">
          <TextField
            type="email"
            placeholder="email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Button
            onClick={() => {
              if (!email || !password) {
                alert("Lütfen email ve şifre giriniz!");
                return;
              }
              mutate();
            }}
            variant="contained"
            className="text-white text-md font-bold bg-black"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          {isError && <p className="text-red-500 mt-2">Login failed!</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
