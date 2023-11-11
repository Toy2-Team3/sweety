import { atom } from "recoil";
export const idState = atom<string>({
  key: "idState",
  default: "",
});

export const pwState = atom<string>({
  key: "pwState",
  default: "",
});

export const profileImageState = atom<File | undefined>({
  key: "profileImageState",
  default: undefined,
});

export const userNameState = atom<string>({
  key: "userNameState",
  default: "",
});

export const birthdayState = atom<string | null>({
  key: "birthdayState",
  default: null,
});

export const selectedGenderState = atom<string>({
  key: "selectedGenderState",
  default: "",
});

export const selectedRegionState = atom<string>({
  key: "selectedRegionState",
  default: "",
});

export const jobState = atom<string>({
  key: "jobState",
  default: "",
});

export const tallState = atom<string>({
  key: "tallState",
  default: "",
});

export const smokingState = atom<boolean>({
  key: "smokingState",
  default: undefined,
});

export const alcholState = atom<string>({
  key: "alcholState",
  default: "",
});

export const mbtiState = atom<string>({
  key: "mbtiState",
  default: "",
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const activeStepState = atom<number>({
  key: "activeStepState",
  default: 0,
});
