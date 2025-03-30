import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addReply } from "@/app/api/services/postServices";

function AddComment() {
  const [editedComment, setEditedComment] = useState<string>("");
  const postId = useParams().id.toString();
  const { mutate } = useMutation({
    mutationFn: () => addReply(postId, editedComment),
  });
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
          onClick={() => mutate()}
        >
          Yorum yap
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
