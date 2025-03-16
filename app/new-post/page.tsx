"use client";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { newPost } from "../api/services/postServices";
import { toast } from "react-toastify";

function NewPost() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [gameName, setGameName] = useState<string | null>(null);

  useEffect(() => {
    const storedGameId = localStorage.getItem("gameId");

    setGameId(storedGameId);

    const storedGameName = localStorage.getItem("gameName");
    setGameName(storedGameName || null);
  }, []);

  const { mutate } = useMutation({
    mutationFn: (data: { postTitle: string; postText: string }) =>
      newPost(gameId, gameName, data.postTitle, data.postText),
    onSuccess: () => {
      console.log("İşlem başarılı");
      toast.success("Form oluşturuldu");
    },
  });

  return (
    <div className="mt-20 flex justify-center">
      <div className="w-1/2 justify-center flex">
        <div className="flex flex-col gap-5 w-1/2">
          <Formik
            initialValues={{ postTitle: "", postText: "" }}
            onSubmit={(values, { resetForm }) => {
              mutate(values);
              resetForm(); // Formu sıfırla
            }}
          >
            {({ handleChange, values }) => (
              <Form className="flex flex-col gap-5">
                <TextField
                  type="text"
                  name="postTitle"
                  placeholder="Konu Başlığı"
                  value={values.postTitle}
                  onChange={handleChange}
                />
                <TextField
                  type="text"
                  name="postText"
                  placeholder="Konu İçeriği"
                  multiline
                  value={values.postText}
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    className="hover:shadow-none"
                  >
                    Kaydet
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
