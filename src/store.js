import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
	const reducer = createReducer();
	const wares = [thunk];

	if (process.env.NODE_ENV !== 'production') {
		const logger = createLogger({
			duration: true,
			timestamp: false,
			collapsed: true,

			level: {
				prevState: 'log',
				action: 'log',
				nextState: 'log',
				error: 'error'
			},

			stateTransformer(state) {
				const s = {};

				Object.keys(state).forEach((key) => {
					const sub = state[key];

					if (sub && sub.toJS) {
						s[key] = sub.toJS();
					} else {
						s[key] = sub;
					}
				});

				return s;
			}
		});

		wares.push(logger);
	}

	const middlware = applyMiddleware(...wares);

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
