const API_URL = process.env.API_URL;

export function loginWithBlizzard() {
	return () => {
		window.location.href = `${API_URL}/auth/bnet`;
	};
}

window.check = function check() {
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
};

window.logout = function logout() {
	fetch(`${API_URL}/auth/logout`, {
		method: 'GET',
		credentials: 'include'
	})
		.then((r) => r.json())
		.then((json) => console.log(json));
};
