import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {Iterable} from 'immutable';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
	const reducer = createReducer();

	const logger = createLogger({
		duration: true,
		timestamp: false,
		collapsed: true,

		stateTransfer(state) {
			if (Iterable.isIterable(state)) return state.toJS();
			return state;
		}
	});

	const middlware = applyMiddleware(thunk, logger);

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
