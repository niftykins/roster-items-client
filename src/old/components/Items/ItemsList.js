import {PropTypes} from 'react';

export default function ItemsList({items}) {
	const itemItems = items && items.map((item) => (
		<Item key={item.id} item={item} />
	));

	return (
		<div className="view-list-container">
			<div className="view-list">
				{itemItems}
			</div>
		</div>
	);
}

ItemsList.propTypes = {
	items: PropTypes.array
};


function Item({item}) {
	return (
		<div className="view-list-item">
			{item.name}
		</div>
	);
}
