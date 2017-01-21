import {Record} from 'immutable';

import * as types from 'constants/types';

const Banner = Record({
	type: null,
	message: null,
	show: false
});

export default function banner(state = new Banner(), action) {
	switch (action.type) {
		case types.SET_BANNER:
			return new Banner(action.payload);

		default: return state;
	}
}

export function getBanner(state) {
	return state;
}
