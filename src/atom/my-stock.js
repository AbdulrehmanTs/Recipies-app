import { atom } from "recoil";

export const stockIngredients = atom({
  key: "stockIngredients", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});
