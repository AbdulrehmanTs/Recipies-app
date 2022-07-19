import { atom } from "recoil";

export const recipesState = atom({
  key: "recipesState", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});
