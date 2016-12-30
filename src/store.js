import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import createReducer from './reducers';

export default function configureStore(apollo, initialState = {}) {
	const reducer = createReducer(apollo.reducer());
	const middlware = applyMiddleware(thunk, logger(), apollo.middleware());
	const store = createStore(reducer, initialState, middlware);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			// eslint-disable-next-line global-require
			const next = require('./reducers').default;
			store.replaceReducer(next);
		});
	}

	return store;
}
