import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import banner from './banner';
import user from './user';

import buttons from './buttons';
import instances from './instances';
import items from './items';

export default function createReducer() {
	return combineReducers({
		routing: routerReducer,

		banner,
		user,

		buttons,
		instances,
		items
	});
}
