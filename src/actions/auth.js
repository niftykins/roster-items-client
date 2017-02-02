import * as types from 'constants/types';

import {HTTP_API_URL} from 'helpers/api';

import {setErrorBanner} from './banners';

export function fetchUser() {
	return (dispatch, getState, api) => {
		dispatch({type: types.USER_FETCH_REQUEST});

		api.call(types.RPC_USER_FETCH).then(
			(message) => {
				dispatch({
					type: types.USER_FETCH_SUCCESS,
					payload: {user: message.data}
				});
			},

			(message) => {
				dispatch({type: types.USER_FETCH_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function login() {
	return () => {
		window.location.href = `${HTTP_API_URL}/auth/bnet`;
	};
}

export function logout() {
	return (dispatch, getState, api) => {
		api.callHTTP('/auth/logout').then(({ok}) => {
			if (ok) dispatch({type: types.USER_LOGOUT_SUCCESS});
		});
	};
}
