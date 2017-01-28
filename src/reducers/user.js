import * as types from 'constants/types';

import User from 'models/user';
const initialState = new User();

export default function user(state = initialState, action) {
	switch (action.type) {
		case types.USER_FETCH_SUCCESS:
			return new User(action.payload);

		case types.USER_LOGOUT_SUCCESS:
			return null;

		default: return state;
	}
}

export function getUser(state) {
	return state;
}
