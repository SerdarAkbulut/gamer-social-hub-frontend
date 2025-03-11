import React from "react";
interface gamePosts {
  postTitle?: string;
  gameName?: string;
  postText?: string;
  userName: string;
}
const UserContent: React.FC<gamePosts> = ({
  userName,
  gameName,
  postText,
  postTitle,
}) => {
  return (
    <>
      <div className="flex flex-col shadow-xl w-full p-5 bg-gray-300 rounded-md ">
        <div className="flex flex-col">
          <h1 className="text-2xl text-blue-400">{userName}</h1>
          <hr />
        </div>
        <div className="flex gap-5  ">
          <a href="#" className="text-lg text-gray-400">
            {gameName}:
          </a>
          <h4 className="text-lg">{postTitle}</h4>
        </div>
        <div>{postText}</div>
      </div>
    </>
  );
};
export default UserContent;
