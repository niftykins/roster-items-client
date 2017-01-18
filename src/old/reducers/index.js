import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

export default function createReducer(apollo) {
	return combineReducers({
		routing: routerReducer,
		apollo
	});
}
