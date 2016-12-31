import {PropTypes} from 'react';

export default function ItemsList({items}) {
	const itemItems = items && items.map((item) => {
		return <Item key={item.id} item={item} />;
	});

	return (
		<div className="items-list-container">
			<div className="items-list">
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
		<div className="item-list-item">
			{item.name}
		</div>
	);
}
