import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';

export default function configureStore(initialState) {
	const middlware = applyMiddleware(logger());
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
