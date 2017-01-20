import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

export default function InstancesList({instances}) {
	const instanceItems = instances.map((instance) => (
		<InstanceItem key={instance.id} instance={instance} />
	));

	return (
		<div className="view-list-container">
			<div className="view-list">
				<Link
					className="view-list-item add-new"
					activeClassName="active"
					to="/instances/new"
				>
					Add new instance
				</Link>

				{instanceItems}
			</div>
		</div>
	);
}

InstancesList.propTypes = {
	instances: ImmutablePropTypes.listOf(ImmutablePropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}))
};


function InstanceItem({instance}) {
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
