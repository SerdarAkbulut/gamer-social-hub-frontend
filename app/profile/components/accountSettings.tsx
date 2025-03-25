import React, { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/app/api/services/userServices";

function AccountSettings() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");

  // Mutation işlemi
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: () => updateUser(userName, email, currentPassword, password),
  });

  const handleUpdate = () => {
    // Mutate fonksiyonunu çağırarak verileri gönder
    mutate();
  };

  return (
    <div className="w-full border-2 rounded-lg p-5">
      <Typography variant="h5" gutterBottom>
        Hesap Ayarları
      </Typography>

      <div className="flex flex-wrap gap-6 justify-center">
        <div className="w-full sm:w-1/2">
          <Typography variant="body1" gutterBottom>
            E-posta
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresinizi girin"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <Typography variant="body1" gutterBottom>
            Kullanıcı Adı
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Kullanıcı adınızı girin"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <Typography variant="body1" gutterBottom>
            Mevcut Şifre
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Değiştirmek istediğiniz şifreyi girin"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Typography variant="body1" gutterBottom>
            Yeni şifre
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Yeni şifreyi girin"
          />
        </div>
      </div>

      <div className="mt-4" style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleUpdate}
          sx={{ borderRadius: 2 }}
          disabled={isLoading} // Yükleniyor durumu, butonu devre dışı bırakır
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Güncelle"
          )}
        </Button>
      </div>

      {isError && (
        <Typography color="error" variant="body1" align="center" marginTop={2}>
          Hata: {error?.message || "Bir şeyler ters gitti."}
        </Typography>
      )}
    </div>
  );
}

export default AccountSettings;
