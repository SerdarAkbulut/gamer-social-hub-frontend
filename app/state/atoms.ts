import { atom } from "recoil";

export const sortState = atom<string>({
  key: "sortState",
  default: "",
});

export const navbarState = atom<boolean>({
  key: "navbarState",
  default: true,
});
export const searchState = atom<string>({
  key: "searchState",
  default: "",
});
