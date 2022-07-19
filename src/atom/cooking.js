import { atom } from "recoil";

export const cooking = atom({
  key: "stockIngredients", // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});
