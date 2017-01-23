import {connect} from 'react-redux';

import {searchItems} from 'actions/items';

import {getItems, getItemsSearch} from 'helpers/selectors';

import ItemsList from 'components/Items/ItemsList';

function getFilteredItems(items, search) {
	return items.filter((item) => (
		item.name.toLowerCase().includes(search.toLowerCase())
	));
}

function mapStateToProps(state) {
	const items = getItems(state);
	const search = getItemsSearch(state);

	const filteredItems = getFilteredItems(items, search);

	return {
		items: filteredItems,
		search
	};
}

export default connect(mapStateToProps, {
	onSearch: searchItems
})(ItemsList);
