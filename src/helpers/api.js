/* eslint class-methods-use-this:0 */

import * as types from 'constants/types';

import {addSocketBanner, removeSocketBanner} from 'actions/banners';

import Socket from './socket';


export const HTTP_API_URL = process.env.HTTP_API_URL;
const WS_API_URL = process.env.WS_API_URL;

let store;
export const syncApiWithStore = (s) => (store = s);


function handleChange({table, operation, record}) {
	const type = `feed_${table}_${operation}`;

	store.dispatch({
		payload: record,
		type
	});
}

function handleSelfUpdate(message) {
	store.dispatch({
		payload: {user: message.data},
		type: types.RPC_SELF_UPDATE
	});
}


let count = 0;
const requests = {};

class API {
	constructor() {
		// every so often check if there's requests we should
		// just remove because they're obviously broken
		setInterval(() => {
			Object.keys(requests).forEach((key) => {
				const request = requests[key];

				// timeout if the request is more than 5 minutes old
				if (request.ts < Date.now() - (5 * 60 * 1000)) {
					request.reject({
						error: 'Request timed out',
						ok: false
					});

					delete requests[key];
				}
			});
		}, 10 * 1000);


		this.socket = new Socket(WS_API_URL, {
			onReconnect: this.handleSocketReconnect,
			onClose: this.handleSocketClose,

			onMessage: this.handleSocketMessage
		});

		this.socket.connect(this.handleSocketConnect);
	}

	callHTTP(endpoint, opts = {}) {
		return fetch(`${HTTP_API_URL}${endpoint}`, {
			...opts,
			credentials: 'include'
		}).then((r) => r.json());
	}

	call(fn, data = {}, isMock) {
		return new Promise((resolve, reject) => {
			count += 1;
			const callId = count;

			requests[callId] = {
				ts: Date.now(),
				resolve,
				reject
			};

			const message = {
				echo: {callId},
				data,
				fn
			};

			if (!isMock) this.socket.send(message);
			else this.mock(message);
		});
	}


	handleSocketMessage(message) {
		if (message.fn === 'change') {
			handleChange(message);
			return;
		}

		if (message.fn === 'self_update') {
			handleSelfUpdate(message);
			return;
		}

		const request = requests[message.echo.callId];
		if (!request) {
			console.warn('API request not found for:', message);
			return;
		}

		delete requests[message.echo];

		if (message.ok) request.resolve(message);
		else request.reject(message);
	}

	// need to trigger a banner being removed on connection
	// in case theres issues during the initial connection
	handleSocketConnect() {
		removeSocketBanner()(store.dispatch);
	}

	handleSocketReconnect() {
		removeSocketBanner()(store.dispatch);
	}

	handleSocketClose() {
		addSocketBanner()(store.dispatch);
	}


	mock(message) {
		const mock = {
			...message,
			ok: true
		};

		setTimeout(() => this.handleMessage(mock), 750);
	}
}

const api = new API();
export default api;
window.api = api;
