import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMutation } from "@tanstack/react-query";
import { uploadUserImage } from "@/app/api/services/userServices"; // API fonksiyonunuzu import edin

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 350,
    height: 200,
    x: 50,
    y: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  // React Query mutation
  const { mutate } = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (response) => {
      console.log("Resim başarıyla yüklendi", response);
    },
    onError: (error) => {
      console.error("Resim yükleme hatası", error);
    },
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dropzone file selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    accept: "image/*",
  });

  // Resim kırpma işlemi
  const onCropComplete = (crop: any) => {
    setCompletedCrop(crop);
    if (crop.width && crop.height && imgRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio;

      canvasRef.current.width = 350 * pixelRatio;
      canvasRef.current.height = 200 * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        350,
        200
      );
    }
  };

  // Resmi yükleme
  const handleUploadClick = async () => {
    if (completedCrop) {
      const croppedImageUrl = canvasRef.current?.toDataURL("image/jpeg");
      if (!croppedImageUrl) {
        alert("Kırpılan görsel alınamadı");
        return;
      }

      const byteString = atob(croppedImageUrl.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      // Yükleme işlemi
      try {
        await mutate(blob); // API'ye yükleme yapılacak
      } catch (error) {
        console.error("Resim yükleme hatası", error);
      }
    } else {
      alert("Lütfen önce bir resim kırpın.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Resim yükleme alanı */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 cursor-pointer w-80 text-center"
      >
        <input {...getInputProps()} />
        <p>Bir resim sürükleyin veya tıklayın</p>
      </div>

      {/* Kırpma işlemi */}
      {selectedImage && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) =>
              setCrop({ ...newCrop, width: 350, height: 200 })
            }
            onComplete={onCropComplete}
            aspect={350 / 200}
            keepSelection
            locked
          >
            <img ref={imgRef} src={selectedImage} alt="Yüklenen Resim" />
          </ReactCrop>
        </div>
      )}

      {/* Kırpılan Görsel */}
      {completedCrop && (
        <div className="mt-4">
          <h3>Kırpılan Görsel:</h3>
          <canvas
            ref={canvasRef}
            className="border object-cover"
            style={{ width: "400px", height: "200px" }}
          />
        </div>
      )}

      {/* Yükleme butonu */}
      <button
        onClick={handleUploadClick}
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md"
      >
        Kırp ve Yükle
      </button>
    </div>
  );
}
