import * as types from 'constants/types';

let bannerTimeoutId;
function setBanner(type, message) {
	return (dispatch) => {
		if (bannerTimeoutId) clearTimeout(bannerTimeoutId);

		dispatch({
			type: types.SET_BANNER,
			payload: {
				show: true,
				message,
				type
			}
		});

		// clear the banner after some time
		const timer = type !== 'error' ? 3500 : 7000;
		bannerTimeoutId = setTimeout(() => {
			dispatch({
				type: types.SET_BANNER,
				payload: {show: false}
			});
		}, timer);
	};
}

export function setSuccessBanner(message) {
	return setBanner('success', message);
}

export function setErrorBanner(message) {
	return setBanner('error', message || 'Something went boom :(');
}
