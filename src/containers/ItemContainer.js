import {connect} from 'react-redux';

import {
	createItem,
	updateItem,
	deleteItem
} from 'actions/items';

import {getItem} from 'helpers/selectors';

import ItemDetails from 'components/Items/ItemDetails';

function mapStateToProps(state, {params}) {
	const item = getItem(state, params.itemId, true);

	return {
		item
	};
}

export default connect(mapStateToProps, {
	onCreate: createItem,
	onUpdate: updateItem,
	onDelete: deleteItem
})(ItemDetails);
