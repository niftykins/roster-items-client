/* eslint class-methods-use-this:0 */

// this.url = 'wss://api.guildsy.io/u/ws';

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
					delete requests[key];
				}
			});
		}, 60 * 1000);
	}

	call(fn, data) {
		return new Promise((resolve, reject) => {
			const callId = count += 1;

			requests[callId] = {
				ts: Date.now(),
				resolve,
				reject
			};

			this.mock(fn, data, {callId});
		});
	}

	handleMessage(message) {
		if (message.fn === 'change') {
			handleChange(message);
			return;
		}

		const request = requests[message.echo.callId];
		if (!request) return;

		delete requests[message.echo];

		if (message.ok) request.resolve(message);
		else request.reject(message);
	}

	mock(fn, data, echo) {
		const message = {
			ok: true,
			data,
			echo,
			fn
		};

		setTimeout(() => this.handleMessage(message), 750);
	}
}

export default new API();
