import {call, API_URL} from 'helpers/api';

export function login() {
	return () => {
		window.location.href = `${API_URL}/auth/bnet`;
	};
}

export function logout(apolloClient) {
	return () => {
		call('/auth/logout').then(({ok}) => {
			if (ok) apolloClient.resetStore();
		});
	};
}

window.check = function check() {
	call('/graphql', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			query: 'query {stuff}'
		})
	})
		.then((r) => r.json())
		.then((json) => console.log(json));
};

window.logout = function logoutDirect() {
	call('/auth/logout')
		.then((r) => r.json())
		.then((json) => console.log(json));
};
