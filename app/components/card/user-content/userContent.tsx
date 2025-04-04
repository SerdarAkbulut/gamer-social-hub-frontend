import Link from "next/link";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useMutation } from "@tanstack/react-query";
import { deleteMyPost, featurePost } from "@/app/api/services/postServices";

interface GamePosts {
  postTitle?: string;
  gameName?: string;
  postText?: string;
  userName?: string;
  gameId?: number;
  postId: number;
  userId?: number;
  deletePost?: boolean;
}

const UserContent: React.FC<GamePosts> = ({
  postId,
  gameId,
  userName,
  gameName,
  postText,
  postTitle,
  userId,
  deletePost,
}) => {
  const { mutate } = useMutation({
    mutationFn: () => featurePost(postId),
    onSuccess: (response) => {
      return response.data;
    },
  });
  const { mutate: deleteThisPost } = useMutation({
    mutationFn: () => deleteMyPost(postId),
    onSuccess: (response) => {
      return response.data;
    },
  });

  return (
    <div className="flex flex-col w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <Link
          href={`/user/${userId}`}
          className="text-xl font-bold text-gray-700"
        >
          {userName}
        </Link>
        {gameName && (
          <Link
            href={`/game/${gameId}`}
            className="text-sm text-blue-500 hover:text-red-500"
          >
            🎮 {gameName}
          </Link>
        )}
      </div>

      <Link href={`/post/${postId}`}>
        <h2 className="mt-3 text-lg font-semibold text-gray-900 hover:text-blue-500 transition-all">
          {postTitle}
        </h2>
      </Link>

      <p className="mt-2 text-gray-600 text-sm line-clamp-3">{postText}</p>

      <div className="mt-4 flex gap-3 text-gray-500 text-sm ">
        <button
          className="hover:text-blue-500 transition"
          onClick={() => mutate()}
        >
          <ArrowUpwardIcon />
        </button>
        <button>💬 5</button>
        {deletePost && (
          <div className="flex justify-end w-full">
            <a
              className="hover:cursor-pointer text-xl mr-3 text-red-500"
              onClick={() => deleteThisPost()}
            >
              Gönderiyi sil
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContent;
