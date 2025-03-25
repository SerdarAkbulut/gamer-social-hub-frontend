"use client";
import { profileState } from "@/app/state/atoms";
import { MenuItem, MenuList, Paper } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
interface User {
  userName?: string;
  id?: number;
}
const ProfileMenu: React.FC<User> = () => {
  const [, setSelect] = useRecoilState(profileState);
  return (
    <div className="w-52">
      <div className="border">
        <MenuList>
          <MenuItem onClick={() => setSelect("10")}>Hesap</MenuItem>
          <MenuItem onClick={() => setSelect("20")}>Profil</MenuItem>
        </MenuList>
      </div>
    </div>
  );
};

export default ProfileMenu;
