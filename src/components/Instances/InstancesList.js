import {PropTypes} from 'react';
import {Link} from 'react-router';

export default function InstancesList({instances = []}) {
	const instanceItems = instances.map((instance) => (
		<Instance key={instance.id} instance={instance} />
	));

	return (
		<div className="view-list-container">
			<div className="view-list">
				{instanceItems}
			</div>
		</div>
	);
}

InstancesList.propTypes = {
	instances: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}))
};


function Instance({instance}) {
	return (
		<Link
			className="view-list-item"
			activeClassName="active"
			to={`/instances/${instance.id}`}
		>
			<div className="name">
				{instance.name}
			</div>
		</Link>
	);
}
