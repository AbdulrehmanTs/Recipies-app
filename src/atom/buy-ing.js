import { atom } from 'recoil';

export const BuyIng = atom({
	key: 'buyIng', // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
});
