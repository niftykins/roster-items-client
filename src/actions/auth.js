const API_URL = 'https://busybot2.ngrok.io';

export function loginWithBlizzard() {
	return () => {
		window.location.href = `${API_URL}/auth/bnet`;
	};
}

function check() {
	fetch(`${API_URL}/graphql?`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		credentials: 'include',
		body: JSON.stringify({
			query: 'query {stuff}'
		})
	})
		.then((r) => r.json())
		.then((json) => console.log(json));
}

window.check = check();
