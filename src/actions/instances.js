import {browserHistory} from 'react-router';

import * as types from 'constants/types';

import {setSuccessBanner, setErrorBanner} from './banners';

import api from 'helpers/api';

export function fetchInstances() {
	return (dispatch) => {
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
	return (dispatch) => {
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

// window.add = function() {
// 	const i = {
// 		wowId: '8025',
// 		name: 'The Nighthold',
// 		released: '1484582400',

// 		wowheadBonuses: {
// 			normal: '0',
// 			heroic: '3444',
// 			mythic: '3445'
// 		},

// 		bosses: [
// 			{
// 				wowId: '102263',
// 				name: 'Skorpyron'
// 			},

// 			{
// 				wowId: '104415',
// 				name: 'Chronomatic Anomaly'
// 			},

// 			{
// 				wowId: '104288',
// 				name: 'Trilliax'
// 			},


// 			{
// 				wowId: '107699',
// 				name: 'Spellblade Aluriel'
// 			},

// 			{
// 				wowId: '104528',
// 				name: 'High Botanist Tel\'arn'
// 			},

// 			{
// 				wowId: '103758',
// 				name: 'Star Augur Etraeus'
// 			},


// 			{
// 				wowId: '103685',
// 				name: 'Tichondrius'
// 			},

// 			{
// 				wowId: '101002',
// 				name: 'Krosus'
// 			},

// 			{
// 				wowId: '110965',
// 				name: 'Elisande'
// 			},


// 			{
// 				wowId: '105503',
// 				name: 'Gul\'dan'
// 			}
// 		]
// 	};

// 	createInstance(i)(window.store.dispatch);
// };

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
