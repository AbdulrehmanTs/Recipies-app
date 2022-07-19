import { atom } from "recoil";

export const isCooking = atom({
  key: "isCooking", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});
