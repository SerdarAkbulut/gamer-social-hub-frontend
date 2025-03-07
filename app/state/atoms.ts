import { atom } from "recoil";

export const gameIdState = atom<string>({
  key: "gameIdState",
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
