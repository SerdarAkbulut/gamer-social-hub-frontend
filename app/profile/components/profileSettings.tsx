import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

function ProfileSettings() {
  const [image, setImage] = useState<string | null>(null);

  // Resim yükleme işlemi
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Resmi data URL olarak kaydediyoruz
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full border-2 rounded-lg p-5">
        <Typography variant="h5" gutterBottom>
          Profil Ayarları
        </Typography>

        <div className="flex justify-center">
          <div className="relative text-white hover:cursor-pointer border p-6 flex flex-col w-full h-28 justify-center  bg-center rounded-xl bg-black">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" inset-0 opacity-0 cursor-pointer w-full z-50 h-full hover:opacity-0"
            />
            <div className="absolute inset-0 bg-cover bg-center rounded-xl opacity-50 bg-black bg-[url('https://www.casper.com.tr/uploads/2023/12/4-ic-safya_w1300_q100_op.webp')]"></div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Stack>
            <Avatar alt="Profile" src={"/profile.jpg"} className="h-32 w-32" />
          </Stack>
        </div>
        <div className="mt-4" style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Güncelle
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ProfileSettings;
