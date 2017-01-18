import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

import User from 'models/user';
const initialState = new User(dummy.user);

export default function user(state = initialState, action) {
	switch (action.type) {
		case types.USER_LOGIN_SUCCESS:
			return new User(action.payload.user);

		case types.USER_LOGOUT_SUCCESS:
			return null;

		default: return state;
	}
}

export function getUser(state) {
	return state;
}
