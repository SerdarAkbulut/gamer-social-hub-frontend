import { atom } from "recoil";

export const categoryState = atom<string>({
  key: "categoryState",
  default: "all",
});

export const navbarState = atom<boolean>({
  key: "navbarState",
  default: true,
});
