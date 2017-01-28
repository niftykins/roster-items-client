import * as types from 'constants/types';

import api, {HTTP_API_URL} from 'helpers/api';

import {setErrorBanner} from './banners';

export function fetchUser() {
	return (dispatch) => {
		dispatch({type: types.USER_FETCH_REQUEST});

		api.call(types.RPC_USER_FETCH, {}, true).then((message) => {
			dispatch({
				type: types.USER_FETCH_SUCCESS,
				payload: message.data
			});
		}).catch((message) => {
			dispatch({type: types.USER_FETCH_FAILURE});

			dispatch(setErrorBanner(message.error));
		});
	};
}

export function login() {
	return () => {
		window.location.href = `${HTTP_API_URL}/auth/bnet`;
	};
}

export function logout() {
	return (dispatch) => {
		api.callHTTP('/auth/logout').then(({ok}) => {
			if (ok) dispatch({type: types.USER_LOGOUT_SUCCESS});
		});
	};
}
