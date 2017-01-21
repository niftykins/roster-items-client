import {Record} from 'immutable';

import * as types from 'constants/types';
// import * as dummy from 'constants/dummy';

import InstanceMap from 'models/instanceMap';
import Instance from 'models/instance';

const initialState = new Record({
	byId: new InstanceMap(),
	isLoading: false,
	error: null
})();

export default function instances(state = initialState, action) {
	switch (action.type) {
		// FETCH
		case types.INSTANCES_FETCH_REQUEST: {
			return state.merge({
				isLoading: true,
				error: null
			});
		}

		case types.INSTANCES_FETCH_SUCCESS: {
			const data = action.payload.instances.map((instance) => {
				return [instance.id, new Instance(instance)];
			});

			return state.merge({
				byId: new InstanceMap(data),
				isLoading: false,
				error: null
			});
		}

		case types.INSTANCES_FETCH_FAILURE: {
			return state.merge({
				isLoading: false,
				error: action.payload
			});
		}


		// UPDATE
		case types.INSTANCE_UPDATE_REQUEST: {
			return state.setIn(
				['byId', action.payload.instanceId, Instance.savingKey],
				true
			);
		}

		case types.INSTANCE_UPDATE_SUCCESS:
		case types.INSTANCE_UPDATE_FAILURE: {
			return state.setIn(
				['byId', action.payload.instanceId, Instance.savingKey],
				false
			);
		}


		// FEED
		case types.FEED_INSTANCES_UPDATE: {
			return state.mergeIn(
				['byId', action.payload.id],
				action.payload
			);
		}

		default: return state;
	}
}

export function getInstance(state, id, createDefault) {
	const instance = state.byId.get(id);

	if (!instance && createDefault) return new Instance();
	return instance;
}

export function getInstances(state) {
	return state.byId.toList();
}

export function getLoading(state) {
	return state.isLoading;
}

export function getError(state) {
	return state.error;
}
