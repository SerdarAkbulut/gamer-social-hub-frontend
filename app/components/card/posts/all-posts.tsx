import React from "react";

interface PostProps {
  postTitle: string;
  postText: string;
}

const AllPosts: React.FC<PostProps> = ({ postText, postTitle }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-700">{postTitle}</h3>
      <p className="text-gray-600 mt-2">{postText}</p>
    </div>
  );
};

export default AllPosts;
