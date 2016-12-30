export const API_URL = process.env.API_URL;

export function call(endpoint, opts = {}) {
	return fetch(`${API_URL}${endpoint}`, {
		...opts,
		credentials: 'include'
	}).then((r) => r.json());
}
