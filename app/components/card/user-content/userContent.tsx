import React from "react";
interface gamePosts {
  postTitle?: string;
  gameName?: string;
  postText?: string;
}
const UserContent: React.FC<gamePosts> = ({
  gameName,
  postText,
  postTitle,
}) => {
  return (
    <>
      <div className="flex flex-col shadow-xl w-full p-5 bg-gray-300 rounded-md ">
        <div className="flex flex-col">
          <h1 className="text-2xl">User Name</h1>
          <hr />
        </div>
        <div className="flex gap-5  ">
          <h4 className="text-lg">{postTitle}</h4>
          <a href="#" className="text-lg text-gray-400">
            {gameName}
          </a>
        </div>
        <div>{postText}</div>
      </div>
    </>
  );
};
export default UserContent;
