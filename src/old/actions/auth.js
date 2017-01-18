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
