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

export const tokenState = atom<string>({
  key: "tokenState",
  default: "",
});

export const profileState = atom<string>({
  key: "profileState",
  default: "10",
});

export const profileBgImage = atom<string>({
  key: "profileBgImage",
  default: "",
});
