import 'babel-polyfill';

// favicon (http://support.flaticon.com/hc/en-us/articles/207248209-How-I-must-insert-the-attribution-)
import 'images/unicorn256.png';

import React from 'react';
import {render} from 'react-dom';
window.React = React;

import configureStore from './store';
const store = configureStore();
window.store = store;

import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

import Root from 'containers/Root';

import 'styles/index.styl';

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
);
