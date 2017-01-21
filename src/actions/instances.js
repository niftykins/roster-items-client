import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

import {setSuccessBanner, setErrorBanner} from './banners';

import api from 'helpers/api';

export function fetchInstances() {
	return (dispatch) => {
		dispatch({type: types.INSTANCES_FETCH_REQUEST});

		setTimeout(() => {
			dispatch({
				type: types.INSTANCES_FETCH_SUCCESS,
				payload: {instances: dummy.instances}
			});
		}, 150);
	};
}

export function createInstance() {
	return () => {

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
		}).then(() => {
			dispatch({
				type: types.INSTANCE_UPDATE_SUCCESS,
				payload: {instanceId}
			});

			dispatch(setSuccessBanner('Instance saved'));
		}).catch((message) => {
			dispatch({
				type: types.INSTANCE_UPDATE_FAILURE,
				payload: {instanceId}
			});

			dispatch(setErrorBanner(message.error));
		});
	};
}
