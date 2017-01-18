import {browserHistory} from 'react-router';

import * as types from 'constants/types';
import {user} from 'constants/dummy';

export function login() {
	return (dispatch, getState) => {
		dispatch({
			type: types.USER_LOGIN_SUCCESS,
			payload: {user}
		});

		const state = getState();
		const s = state.routing.locationBeforeTransitions.state;

		const url = (s && s.from) ? s.from : '/';
		browserHistory.push(url);
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({type: types.USER_LOGOUT_SUCCESS});
	};
}
