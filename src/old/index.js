import 'babel-polyfill';
import 'isomorphic-fetch';

// favicon (http://support.flaticon.com/hc/en-us/articles/207248209-How-I-must-insert-the-attribution-)
import 'images/unicorn256.png';
import 'styles/index.styl';

import React from 'react';
import {render} from 'react-dom';
window.React = React;

import {ApolloProvider} from 'react-apollo';
import createApolloClient from 'helpers/create-apollo-client';
const client = createApolloClient();

import configureStore from './store';
const store = configureStore(client);
window.store = store;

import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import makeRouter from './routes';
const history = syncHistoryWithStore(browserHistory, store);
const router = makeRouter(history);

render(
	<ApolloProvider store={store} client={client}>
		{router}
	</ApolloProvider>,
	document.getElementById('root')
);
