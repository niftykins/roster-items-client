// import {PropTypes} from 'react';
import {Link} from 'react-router';

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
