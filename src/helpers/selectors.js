import * as fromUser from 'reducers/user';
import * as fromBanner from 'reducers/banner';
import * as fromInstances from 'reducers/instances';

export const getUser = (state) => fromUser.getUser(state.user);

export const getBanner = (state) => fromBanner.getBanner(state.banner);

export const getInstance = (state, id, useForm) => (
	fromInstances.getInstance(state.instances, id, useForm)
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
