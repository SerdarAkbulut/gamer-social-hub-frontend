"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../state/atoms";
import ProfileSettings from "./components/profileSettings";
import AccountSettings from "./components/accountSettings";
import ProfileMenu from "./components/profileMenu";

function Profile() {
  const [select] = useRecoilState(profileState);

  const renderComponent = () => {
    switch (select) {
      case "10":
        return <AccountSettings />;
      case "20":
        return <ProfileSettings />;
      default:
        return null;
    }
  };
  return (
    <div className="mt-20 px-72 ">
      <div className="flex ">
        <div className="shadow-lg p-5 h-1/5 rounded-lg">
          <ProfileMenu />
        </div>
        <div className="flex ml-20 w-full">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default Profile;
