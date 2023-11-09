import { atom } from "recoil";
export const idState = atom({
  key: "idState",
  default: "",
});

export const pwState = atom({
  key: "pwState",
  default: "",
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
