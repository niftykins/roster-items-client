import * as fromUser from 'reducers/user';
import * as fromInstances from 'reducers/instances';

export const getUser = (state) => fromUser.getUser(state.user);

export const getInstance = (state, id, createDefault) => (
	fromInstances.getInstance(state.instances, id, createDefault)
);
export const getInstances = (state) => (
	fromInstances.getInstances(state.instances)
);
export const getInstanceLoading = (state) => (
	fromInstances.getLoading(state.instances)
);
export const getInstanceError = (state) => (
	fromInstances.getError(state.instances)
);
