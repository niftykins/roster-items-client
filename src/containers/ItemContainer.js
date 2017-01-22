import {connect} from 'react-redux';

import {
	createItem,
	updateItem,
	deleteItem
} from 'actions/items';

import {getItem, getInstances} from 'helpers/selectors';

import ItemDetails from 'components/Items/ItemDetails';

function getSouceOptions(instances) {
	const options = [];

	instances.forEach((instance) => {
		options.push({
			name: instance.name,
			id: instance.wowId,
			heading: true
		});

		instance.bosses.forEach((boss) => {
			options.push({
				name: boss.name,
				id: boss.wowId,
				child: true
			});
		});
	});

	return options;
}

function mapStateToProps(state, {params}) {
	const item = getItem(state, params.itemId, true);

	const instances = getInstances(state);
	const sourceOptions = getSouceOptions(instances);

	return {
		sourceOptions,
		item
	};
}

export default connect(mapStateToProps, {
	onCreate: createItem,
	onUpdate: updateItem,
	onDelete: deleteItem
})(ItemDetails);
