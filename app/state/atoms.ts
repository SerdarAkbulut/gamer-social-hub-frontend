import { atom } from "recoil";

export const categoryState = atom<string>({
  key: "categoryState",
  default: "all",
});

export const navbarState = atom<boolean>({
  key: "navbarState",
  default: true,
});
export const searchState = atom<string>({
  key: "searchState",
  default: "",
});
