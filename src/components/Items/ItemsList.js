import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

import Item from 'models/item';

export default function ItemsList({items}) {
	const itemItems = items.map((item) => (
		<ItemItem key={item.id} item={item} />
	));

	return (
		<div className="view-list-container">
			<div className="view-list">
				<Link
					className="view-list-item add-new"
					activeClassName="active"
					to="/items/new"
				>
					Add new item
				</Link>

				{itemItems}
			</div>
		</div>
	);
}

ItemsList.propTypes = {
	items: ImmutablePropTypes.listOf(PropTypes.instanceOf(Item))
};


function ItemItem({item}) {
	return (
		<Link
			className="view-list-item"
			activeClassName="active"
			to={`/items/${item.id}`}
		>
			<div className="name">
				{item.name}
			</div>
		</Link>
	);
}
