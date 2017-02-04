import {browserHistory} from 'react-router';

import * as types from 'constants/types';

import {setSuccessBanner, setErrorBanner} from './banners';

export function fetchButtons() {
	return (dispatch, getState, api) => {
		dispatch({type: types.BUTTONS_FETCH_REQUEST});

		api.call(types.RPC_BUTTONS_FETCH).then(
			(message) => {
				dispatch({
					type: types.BUTTONS_FETCH_SUCCESS,
					payload: {buttons: message.data}
				});
			},

			(message) => {
				dispatch({
					type: types.BUTTONS_FETCH_FAILURE,
					payload: message.error
				});
			}
		);
	};
}

export function createButton(data) {
	return (dispatch, getState, api) => {
		dispatch({type: types.BUTTON_CREATE_REQUEST});

		api.call(types.RPC_BUTTON_CREATE, data).then(
			(message) => {
				dispatch({type: types.BUTTON_CREATE_SUCCESS});

				dispatch(setSuccessBanner('Button saved'));

				browserHistory.push(`/buttons/${message.data.id}`);
			},

			(message) => {
				dispatch({type: types.BUTTON_CREATE_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function updateButton(buttonId, data, cb) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.BUTTON_UPDATE_REQUEST,
			payload: {buttonId}
		});

		api.call(types.RPC_BUTTON_UPDATE, {
			id: buttonId,
			...data
		}).then(
			() => {
				dispatch({
					type: types.BUTTON_UPDATE_SUCCESS,
					payload: {buttonId}
				});

				dispatch(setSuccessBanner('Button saved'));

				if (cb) cb();
			},

			(message) => {
				dispatch({
					type: types.BUTTON_UPDATE_FAILURE,
					payload: {buttonId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function deleteButton(buttonId) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.BUTTON_DELETE_REQUEST,
			payload: {buttonId}
		});

		api.call(types.RPC_BUTTON_DELETE, {id: buttonId}).then(
			() => {
				dispatch({
					type: types.BUTTON_DELETE_SUCCESS,
					payload: {buttonId}
				});

				dispatch(setSuccessBanner('Button removed'));
				browserHistory.push('/buttons');
			},

			(message) => {
				dispatch({
					type: types.BUTTON_DELETE_FAILURE,
					payload: {buttonId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}
