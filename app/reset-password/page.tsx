"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  checkPasswordResetToken,
  resetPassword,
} from "../api/services/userServices";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => {
      if (!token) {
        return Promise.reject("Token eksik");
      }
      return resetPassword(token, newPassword);
    },
    onSuccess: (response) => {
      router.push("/login");
      return response.data;
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setToken(queryParams.get("token"));
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkPasswordToken", token],
    queryFn: () => {
      if (!token) return Promise.reject("Token eksik");
      return checkPasswordResetToken(token);
    },
    enabled: !!token,
    staleTime: Infinity,
  });
  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (isError || data?.isValid === false) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <Typography variant="h6">Bağlantı Linkinin süresi dolmuş</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          Ana Sayfaya Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Şifre Sıfırla
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Yeni Şifre"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Yeni Şifre (Tekrar)"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => mutate()}
          >
            Şifreyi Güncelle
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ResetPassword;
