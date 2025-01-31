import React from "react";

function UserContent() {
  return (
    <>
      <div className="flex flex-col shadow-xl w-full p-5 bg-gray-300 rounded-md mt-5">
        <div className="flex flex-col">
          <h1 className="text-2xl">User Name</h1>
          <hr />
        </div>
        <div className="flex gap-5  ">
          <h4 className="text-lg">İtem Önerisi</h4>
          <a href="#" className="text-lg text-gray-400">
            Game
          </a>
        </div>
        <div>konu</div>
      </div>
    </>
  );
}
export default UserContent;
