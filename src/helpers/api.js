/* eslint class-methods-use-this:0 */

import Socket from './socket';

// this.url = 'wss://api.guildsy.io/u/ws';

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


let count = 0;
const requests = {};

class API {
	constructor() {
		// every minute check if there's requests we should
		// just remove because they're obviously broken
		setInterval(() => {
			Object.keys(requests).forEach((key) => {
				const request = requests[key];

				// if the request is more than 5 minutes old
				if (request.ts < Date.now() - (5 * 60 * 1000)) {
					request.reject({
						error: 'Request timed out',
						ok: false
					});

					delete requests[key];
				}
			});
		}, 10 * 1000);

		this.socket = new Socket(WS_API_URL, this.handleMessage);
		this.socket.connect();
	}

	callHTTP(endpoint, opts = {}) {
		return fetch(`${HTTP_API_URL}${endpoint}`, {
			...opts,
			credentials: 'include'
		}).then((r) => r.json());
	}

	call(fn, data = {}, isReal) {
		return new Promise((resolve, reject) => {
			const callId = count += 1;

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

			if (isReal) this.socket.send(message);
			else this.mock(message);
		});
	}

	handleMessage(message) {
		if (message.fn === 'change') {
			handleChange(message);
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
