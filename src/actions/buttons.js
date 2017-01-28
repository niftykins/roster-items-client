import {browserHistory} from 'react-router';

import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

import {setSuccessBanner, setErrorBanner} from './banners';

import api from 'helpers/api';

export function fetchButtons() {
	return (dispatch) => {
		dispatch({type: types.BUTTONS_FETCH_REQUEST});

		setTimeout(() => {
			dispatch({
				type: types.BUTTONS_FETCH_SUCCESS,
				payload: {buttons: dummy.buttons}
			});
		}, 150);
	};
}

export function createButton(data) {
	return (dispatch) => {
		dispatch({type: types.BUTTON_CREATE_REQUEST});

		api.call(types.RPC_BUTTON_CREATE, data, true).then(
			() => {
				dispatch({type: types.BUTTON_CREATE_SUCCESS});

				dispatch(setSuccessBanner('Button saved'));

				// XXX REMOVE
				const id = dummy.newId('button');
				dispatch({
					type: types.FEED_BUTTONS_INSERT,
					payload: {id, ...data}
				});

				browserHistory.push(`/buttons/${id}`);
			},

			(message) => {
				dispatch({type: types.BUTTON_CREATE_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function updateButton(buttonId, data) {
	return (dispatch) => {
		dispatch({
			type: types.BUTTON_UPDATE_REQUEST,
			payload: {buttonId}
		});

		api.call(types.RPC_BUTTON_UPDATE, {
			id: buttonId,
			...data
		}, true).then(
			() => {
				dispatch({
					type: types.BUTTON_UPDATE_SUCCESS,
					payload: {buttonId}
				});

				dispatch(setSuccessBanner('Button saved'));

				// XXX REMOVE
				dispatch({
					type: types.FEED_BUTTONS_UPDATE,
					payload: {id: buttonId, ...data}
				});
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
	return (dispatch) => {
		dispatch({
			type: types.BUTTON_DELETE_REQUEST,
			payload: {buttonId}
		});

		api.call(types.RPC_BUTTON_DELETE, {id: buttonId}, true).then(
			() => {
				// XXX REMOVE
				dispatch({
					type: types.FEED_BUTTONS_DELETE,
					payload: {id: buttonId}
				});

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
