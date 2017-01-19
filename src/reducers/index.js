import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './user';

import instances from './instances';

export default function createReducer() {
	return combineReducers({
		routing: routerReducer,

		user,

		instances
	});
}
