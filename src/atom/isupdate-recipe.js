import { atom } from "recoil";

export const isupdateRecipe = atom({
  key: "isupdateRecipe", // unique ID (with respect to other atoms/selectors)
  default: {
    state: false,
    id: null
  } // default value (aka initial value)
});
