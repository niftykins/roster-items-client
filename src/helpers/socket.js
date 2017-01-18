let store;
export function syncSocketWithStore(s) {
	store = s;
}


function handleChange({table, op, record}) {
	const type = `${table}_${op}`;

	store.dispatch({
		data: record,
		type
	});
}

// function handleResult(message, cb) {
// 	cb(store.dispatch, message, store.getState);
// }

class Socket {
	constructor(retry) {
		this.url = 'wss://api.guildsy.io/u/ws';

		this.retry = !!retry;

		this.callbacks = {};
		this.queue = [];
	}

	connect(cb) {
		// if we're already connected we need to close it
		if (this.socket && this.socket.readyState) this.socket.close();

		this.onConnectCallback = cb;

		this.lastCheck = 0;
		this.lastPing = Date.now();

		this.reconnect();
	}

	disconnect() {
		this.stop();

		if (this.socket) this.socket.close();
	}

	reconnect(disconnect) {
		if (disconnect) this.disconnect();

		this.socket = new WebSocket(this.url);
		this.socket.onopen = this.onOpen;
		this.socket.onclose = this.onClose;
		this.socket.onerror = this.onError;
		this.socket.onmessage = this.onMessage;
	}

	start() {
		this.lastCheck = Date.now();
		this.lastPeriod = 1000;

		clearInterval(this.interval);
		this.interval = setInterval(this.checker, 1000);
	}

	stop() {
		clearInterval(this.interval);
	}

	checker = () => {
		if (this.socket.readyState <= 1) {
			this.ping();
			return;
		}

		if ((this.lastCheck + this.lastPeriod) < Date.now()) {
			console.warn('[SOCKET] client reconnecting', this.lastPeriod);

			this.lastCheck = Date.now();
			this.lastPeriod = this.lastPeriod * 2;

			if (this.lastPeriod > 120 * 1000) {
				this.lastPeriod = 120 * 1000;
			}

			this.reconnect();
		}
	}

	addCallback(fn, cb) {
		if (typeof cb !== 'function') {
			console.error('[SOCKET] cb not a function:', cb);
			return;
		}

		if (!this.callbacks[fn]) {
			this.callbacks[fn] = [];
		}

		this.callbacks[fn].push(cb);
	}

	removeCallback(fn) {
		let cb = function dummyCallback() {};

		if (this.callbacks[fn] && this.callbacks[fn].length) {
			cb = this.callbacks[fn].shift();
		}

		return cb;
	}

	ping() {
		// every minute we need to ping to keep it alive
		if ((Date.now() - this.lastPing) > 60 * 1000) {
			this.lastPing = Date.now();
			this.socket.send('ping');
		}
	}

	send(data, cb) {
		if (typeof data !== 'object') {
			console.error('[SOCKET] not an object:', data);
			return;
		}

		try {
			const message = JSON.stringify(data);

			if (cb) this.addCallback(data.fn, cb);

			// queue the socket calls until it's actually connected
			if (!this.socket || !this.socket.readyState) {
				this.queue.push(message);
				return;
			}

			console.warn('[SOCKET] sending:', data);
			this.socket.send(message);
		} catch (e) {
			console.error('[SOCKET]', data, e);
		}
	}

	onOpen = () => {
		console.warn('[SOCKET] client connected', this.url);

		if (this.onConnectCallback) {
			this.onConnectCallback();
			delete this.onConnectCallback;
		}

		// send any queued messages so far
		while (this.queue.length) {
			const message = this.queue.shift();
			console.warn('[SOCKET] sending queued', message);

			this.socket.send(message);
		}

		if (this.retry) this.start();
	}

	onClose = () => {
		console.warn('[SOCKET] client closed');
	}

	onError = (e) => {
		console.warn('[SOCKET] client error', e);

		if (this.retry && !this.lastCheck) this.start(0);
	}

	onMessage = (e) => {
		if (e.data === 'pong') return;

		const message = JSON.parse(e.data);
		console.warn('[SOCKET] message:', message);

		if (!message.success && message.fn !== 'change') {
			console.error('[SOCKET] message failed:', message);
		}

		// const go = handleResult.bind(null, message);

		switch (message.fn) {
			case 'change':
				handleChange(message);
				break;

			default:
				console.error('[SOCKET] unhandled message:', message);
		}

		const cb = this.removeCallback(message.fn);
		cb(message);
	}
}

export default new Socket(true);
