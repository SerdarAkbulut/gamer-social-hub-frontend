import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMutation } from "@tanstack/react-query";
import { uploadUserImage } from "@/app/api/services/userServices";

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Daha büyük başlangıç crop alanı
  const [crop, setCrop] = useState({
    unit: "px",
    width: 640,
    height: 192,
    x: 50,
    y: 50,
  });

  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { mutate } = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (response) => {
      console.log("Resim başarıyla yüklendi", response);
    },
    onError: (error) => {
      console.error("Resim yükleme hatası", error);
    },
  });

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

  const onCropComplete = (crop: any) => {
    setCompletedCrop(crop);
    if (crop.width && crop.height && imgRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio;

      canvasRef.current.width = crop.width * pixelRatio;
      canvasRef.current.height = crop.height * pixelRatio;

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
        crop.width,
        crop.height
      );
    }
  };

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
      try {
        await mutate(blob);
      } catch (error) {
        console.error("Resim yükleme hatası", error);
      }
    } else {
      alert("Lütfen önce bir resim kırpın.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 cursor-pointer w-full max-w-3xl text-center"
      >
        <input {...getInputProps()} />
        <p>Bir resim sürükleyin veya tıklayın</p>
      </div>

      {selectedImage && (
        <div className="max-w-4xl w-full">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) =>
              setCrop({
                ...newCrop,
                width: 640,
                height: 192,
              })
            }
            onComplete={onCropComplete}
            aspect={640 / 192}
            keepSelection
            locked
          >
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Yüklenen Resim"
              className="max-w-full h-auto"
            />
          </ReactCrop>
        </div>
      )}

      {completedCrop && (
        <div className="mt-4 w-full max-w-4xl">
          <h3 className="mb-2 text-lg font-semibold">Kırpılan Görsel:</h3>
          <canvas
            ref={canvasRef}
            className="border"
            style={{
              width: "80vw", // responsive genişlik
              height: "24vw", // responsive yükseklik
              maxWidth: "640px",
              maxHeight: "192px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <button
        onClick={handleUploadClick}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-all"
      >
        Kırp ve Yükle
      </button>
    </div>
  );
}
