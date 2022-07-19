import { atom } from 'recoil';

export const alertData = atom({
	key: 'alert', // unique ID (with respect to other atoms/selectors)
	default: {
		heading: '',
		message: '',
	}, // default value (aka initial value)
});
