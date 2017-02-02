import {browserHistory} from 'react-router';

import * as types from 'constants/types';

import {setSuccessBanner, setErrorBanner} from './banners';

export function fetchInstances() {
	return (dispatch, getState, api) => {
		dispatch({type: types.INSTANCES_FETCH_REQUEST});

		api.call(types.RPC_INSTANCES_FETCH).then(
			(message) => {
				dispatch({
					type: types.INSTANCES_FETCH_SUCCESS,
					payload: {instances: message.data}
				});
			},

			(message) => {
				dispatch({
					type: types.INSTANCES_FETCH_FAILURE,
					payload: message.error
				});
			}
		);
	};
}

export function createInstance(data) {
	return (dispatch, getState, api) => {
		dispatch({type: types.INSTANCE_CREATE_REQUEST});

		api.call(types.RPC_INSTANCE_CREATE, data).then(
			(message) => {
				dispatch({type: types.INSTANCE_CREATE_SUCCESS});

				dispatch(setSuccessBanner('Instance saved'));

				browserHistory.push(`/instances/${message.data.id}`);
			},

			(message) => {
				dispatch({type: types.INSTANCE_CREATE_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function updateInstance(instanceId, data) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.INSTANCE_UPDATE_REQUEST,
			payload: {instanceId}
		});

		api.call(types.RPC_INSTANCE_UPDATE, {
			id: instanceId,
			...data
		}).then(
			() => {
				dispatch({
					type: types.INSTANCE_UPDATE_SUCCESS,
					payload: {instanceId}
				});

				dispatch(setSuccessBanner('Instance saved'));
			},

			(message) => {
				dispatch({
					type: types.INSTANCE_UPDATE_FAILURE,
					payload: {instanceId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function deleteInstance(instanceId) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.INSTANCE_DELETE_REQUEST,
			payload: {instanceId}
		});

		api.call(types.RPC_INSTANCE_DELETE, {id: instanceId}).then(
			() => {
				dispatch({
					type: types.INSTANCE_DELETE_SUCCESS,
					payload: {instanceId}
				});

				dispatch(setSuccessBanner('Instance removed'));
				browserHistory.push('/instances');
			},

			(message) => {
				dispatch({
					type: types.INSTANCE_DELETE_FAILURE,
					payload: {instanceId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}
