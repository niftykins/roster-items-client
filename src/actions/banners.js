import * as types from 'constants/types';

export function clearBanner() {
	return (dispatch) => {
		dispatch({
			type: types.SET_BANNER,
			payload: {show: false}
		});
	};
}

let bannerTimeoutId;
function setBanner(type, message, showForever) {
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

		if (!showForever) {
			// clear the banner after some time
			const timer = type !== 'error' ? 3500 : 7000;

			bannerTimeoutId = setTimeout(() => {
				clearBanner()(dispatch);
			}, timer);
		}
	};
}

export function setSuccessBanner(message) {
	return setBanner('success', message);
}

export function setErrorBanner(message) {
	return setBanner('error', message || 'Something went boom :(');
}

export function setSocketBanner() {
	return setBanner('error', 'Connection to the server has gone loco', true);
}
