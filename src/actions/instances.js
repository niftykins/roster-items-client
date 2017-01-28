import {browserHistory} from 'react-router';

import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

import {setSuccessBanner, setErrorBanner} from './banners';

import api from 'helpers/api';

export function fetchInstances() {
	return (dispatch) => {
		dispatch({type: types.INSTANCES_FETCH_REQUEST});

		api.call(types.RPC_INSTANCES_FETCH, {}, true).then(
			() => {
				dispatch({
					type: types.INSTANCES_FETCH_SUCCESS,
					payload: {instances: dummy.instances}
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
	return (dispatch) => {
		dispatch({type: types.INSTANCE_CREATE_REQUEST});

		api.call(types.RPC_INSTANCE_CREATE, data, true).then(
			() => {
				dispatch({type: types.INSTANCE_CREATE_SUCCESS});

				dispatch(setSuccessBanner('Instance saved'));

				// XXX REMOVE
				const id = dummy.newId('instance');
				dispatch({
					type: types.FEED_INSTANCES_INSERT,
					payload: {id, ...data}
				});

				browserHistory.push(`/instances/${id}`);
			},

			(message) => {
				dispatch({type: types.INSTANCE_CREATE_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function updateInstance(instanceId, data) {
	return (dispatch) => {
		dispatch({
			type: types.INSTANCE_UPDATE_REQUEST,
			payload: {instanceId}
		});

		api.call(types.RPC_INSTANCE_UPDATE, {
			id: instanceId,
			...data
		}, true).then(
			() => {
				dispatch({
					type: types.INSTANCE_UPDATE_SUCCESS,
					payload: {instanceId}
				});

				dispatch(setSuccessBanner('Instance saved'));

				// XXX REMOVE
				dispatch({
					type: types.FEED_INSTANCES_UPDATE,
					payload: {id: instanceId, ...data}
				});
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
	return (dispatch) => {
		dispatch({
			type: types.INSTANCE_DELETE_REQUEST,
			payload: {instanceId}
		});

		api.call(types.RPC_INSTANCE_DELETE, {id: instanceId}, true).then(
			() => {
				// XXX REMOVE
				dispatch({
					type: types.FEED_INSTANCES_DELETE,
					payload: {id: instanceId}
				});

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
