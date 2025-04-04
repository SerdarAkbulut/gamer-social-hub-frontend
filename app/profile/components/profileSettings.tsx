import ImageUploader from "@/app/components/cropper/imageCropper";
import { Button, Typography } from "@mui/material";
import React from "react";

function ProfileSettings() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full border-2 rounded-lg p-5">
        <Typography variant="h5" gutterBottom>
          Profil Ayarları
        </Typography>

        <ImageUploader></ImageUploader>
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
