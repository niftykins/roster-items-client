import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

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
