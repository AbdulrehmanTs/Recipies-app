import { atom } from 'recoil';

export const alert = atom({
	key: 'alert', // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
});
