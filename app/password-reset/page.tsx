"use client";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { resetPassword } from "../api/services/userServices";

function PasswordReset() {
  const [email, setEmail] = useState();

  const { mutate } = useMutation({
    mutationFn: () => resetPassword(email),
    onSuccess: (response) => {
      return response.data;
    },
  });
  return (
    <div className="mt-20">
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <Button variant="contained" onClick={() => mutate()}>
        Gönder
      </Button>
    </div>
  );
}

export default PasswordReset;
