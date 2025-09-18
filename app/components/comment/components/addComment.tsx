"use client";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addReply } from "@/app/api/services/postServices";

function AddComment() {
  const [editedComment, setEditedComment] = useState("");
  const params = useParams();
  const postId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const idNumber = parseInt(postId, 10);

  const mutation = useMutation({
    mutationFn: (comment: string) => addReply(idNumber, comment),
  });
  if (!postId) {
    return <div>Post ID bulunamadı</div>;
  }
  return (
    <div className="flex w-full flex-col">
      <TextField
        label="Yorumunuzu buraya yazın"
        variant="outlined"
        fullWidth
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={() => mutation.mutate(editedComment)}
        >
          Yorum yap
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
