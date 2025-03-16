import React from "react";

interface props {
  postTitle: string;
  postText: string;
}
const AllPosts: React.FC<props> = ({ postText, postTitle }) => {
  return (
    <>
      <div className="flex flex-col gap-1 border-2 p-3 border-gray-500 rounded-md">
        <div>{postTitle}</div>
        <div>{postText}</div>
      </div>
    </>
  );
};

export default AllPosts;
