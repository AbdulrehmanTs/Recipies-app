import { atom } from 'recoil';

export const addRecipeModal = atom({
	key: 'recipeModalState', // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
});
