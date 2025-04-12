"use client";
import { getPostDetails } from "@/app/api/services/postServices";
import CommentPage from "@/app/components/comment/page";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SvgIcon from "@mui/icons-material/BookmarkBorder";
import { savePost } from "@/app/api/services/userServices";
function ForumPage() {
  const params = useParams();
  const postId = params.id.toString();
  const { mutate } = useMutation({
    mutationFn: () => savePost(postId),
    onSuccess: () => {
      refetch();
      console.log("Post kaydedildi");
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPostDetails(postId),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      console.log("Post detayları güncellendi:", data);
    }
  }, [data]);

  return (
    <div className="mt-20 xl:px-72 px-32 md:px-48 sm:px-20 lg:px-52">
      {data?.postDetails.map((post, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          <div className="bg-blue-600 text-white p-6 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-semibold">{post.user.userName}</h1>
              <h2 className="text-lg opacity-80">{post.gameName}</h2>
            </div>
            <div>
              <SvgIcon
                component={BookmarkIcon}
                inheritViewBox
                className={`h-8 w-8 hover:cursor-pointer ${
                  post.isSaved ? "text-black" : "text-white"
                }`}
                onClick={() => mutate()}
              />
            </div>
          </div>
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">
              {post.postTitle}
            </h1>
            <p className="text-lg text-gray-700 mt-2">{post.postText}</p>
          </div>

          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Yanıtlar
            </h3>
            {post.replies?.length > 0 ? (
              post.replies.map((reply, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4"
                >
                  <p className="text-sm font-semibold text-gray-700">
                    {reply?.user?.userName}
                  </p>
                  <p className="text-gray-800 mt-1">{reply?.reply}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Henüz yanıt yok.</p>
            )}
          </div>
        </div>
      ))}
      <div className="flex ml-5 mt-12">
        <CommentPage></CommentPage>
      </div>
    </div>
  );
}

export default ForumPage;
