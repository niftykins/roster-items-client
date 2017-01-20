export default class Socket {
	constructor(url, messageHandler) {
		this.url = url;

		this.messageHandler = messageHandler;

		this.retry = true;
		this.queue = [];
	}

	connect(cb) {
		// if we're already connected we need to close it
		if (this.socket && this.socket.readyState) {
			this.socket.close();
		}

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

	ping() {
		// every minute we need to ping to keep it alive
		if ((Date.now() - this.lastPing) > 60 * 1000) {
			this.lastPing = Date.now();
			this.socket.send('ping');
		}
	}

	send(data) {
		if (typeof data !== 'object') {
			console.error('[SOCKET] not an object:', data);
			return;
		}

		try {
			const message = JSON.stringify(data);

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

		this.messageHandler(message);
	}
}
