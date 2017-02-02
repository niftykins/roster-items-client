import {browserHistory} from 'react-router';

import * as types from 'constants/types';
import * as dummy from 'constants/dummy';

import {setSuccessBanner, setErrorBanner} from './banners';

export function searchItems(search) {
	return {
		type: types.SEARCH_ITEMS,
		payload: search
	};
}

export function fetchItems() {
	return (dispatch) => {
		dispatch({type: types.ITEMS_FETCH_REQUEST});

		setTimeout(() => {
			dispatch({
				type: types.ITEMS_FETCH_SUCCESS,
				payload: {items: dummy.items}
			});
		}, 150);
	};
}

export function createItem(data) {
	return (dispatch, getState, api) => {
		dispatch({type: types.ITEM_CREATE_REQUEST});

		api.call(types.RPC_ITEM_CREATE, data, true).then(
			() => {
				dispatch({type: types.ITEM_CREATE_SUCCESS});

				dispatch(setSuccessBanner('Item saved'));

				// XXX REMOVE
				const id = dummy.newId('item');
				dispatch({
					type: types.FEED_ITEMS_INSERT,
					payload: {id, ...data}
				});

				browserHistory.push(`/items/${id}`);
			},

			(message) => {
				dispatch({type: types.ITEM_CREATE_FAILURE});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function updateItem(itemId, data) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.ITEM_UPDATE_REQUEST,
			payload: {itemId}
		});

		api.call(types.RPC_ITEM_UPDATE, {
			id: itemId,
			...data
		}, true).then(
			() => {
				dispatch({
					type: types.ITEM_UPDATE_SUCCESS,
					payload: {itemId}
				});

				dispatch(setSuccessBanner('Item saved'));

				// XXX REMOVE
				dispatch({
					type: types.FEED_ITEMS_UPDATE,
					payload: {id: itemId, ...data}
				});
			},

			(message) => {
				dispatch({
					type: types.ITEM_UPDATE_FAILURE,
					payload: {itemId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}

export function deleteItem(itemId) {
	return (dispatch, getState, api) => {
		dispatch({
			type: types.ITEM_DELETE_REQUEST,
			payload: {itemId}
		});

		api.call(types.RPC_ITEM_DELETE, {id: itemId}, true).then(
			() => {
				// XXX REMOVE
				dispatch({
					type: types.FEED_ITEMS_DELETE,
					payload: {id: itemId}
				});

				dispatch({
					type: types.ITEM_DELETE_SUCCESS,
					payload: {itemId}
				});

				dispatch(setSuccessBanner('Item removed'));
				browserHistory.push('/items');
			},

			(message) => {
				dispatch({
					type: types.ITEM_DELETE_FAILURE,
					payload: {itemId}
				});

				dispatch(setErrorBanner(message.error));
			}
		);
	};
}
