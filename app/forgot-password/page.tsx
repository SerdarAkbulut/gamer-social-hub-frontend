"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { forgotPassowrd } from "../api/services/userServices";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: () => forgotPassowrd(email),
    onSuccess: (response) => {
      if (response.data.valid) {
        setSuccessMessage(
          response.data.message ||
            "Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin."
        );
      } else {
        setSuccessMessage("Geçersiz istek. Lütfen doğru bilgileri girin.");
      }
    },
    onError: () => {
      setSuccessMessage("Hata oluştu, lütfen tekrar deneyin.");
    },
  });

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
        <TextField
          fullWidth
          label="E-Posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => mutate()}
          disabled={isLoading}
        >
          {isLoading ? "Gönderiliyor..." : "Gönder"}
        </Button>
        {successMessage && (
          <Typography sx={{ mt: 2, color: "green", textAlign: "center" }}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default PasswordReset;
