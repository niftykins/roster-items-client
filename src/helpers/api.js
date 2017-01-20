/* eslint class-methods-use-this:0 */

// this.url = 'wss://api.guildsy.io/u/ws';

let store;
export const syncApiWithStore = (s) => (store = s);


function handleChange({table, operation, record}) {
	const type = `${table}_${operation}`;

	store.dispatch({
		payload: record,
		type
	});
}


let count = 0;
const requests = {};

class API {
	call(fn, data) {
		return new Promise((resolve, reject) => {
			const callId = count += 1;

			requests[callId] = {
				ts: new Date(),
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
		delete requests[message.echo];

		if (request) {
			request.resolve(message);
		}
	}

	mock(fn, data, echo) {
		const message = {
			success: true,
			data,
			echo,
			fn
		};

		setTimeout(() => this.handleMessage(message), 750);
	}
}

export default new API();
