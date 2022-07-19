import { atom } from "recoil";

export const ingredientsStore = atom({
  key: "ingredients", // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});
