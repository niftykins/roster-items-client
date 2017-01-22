import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchInstances} from 'actions/instances';
import {fetchItems} from 'actions/items';

import {
	getInstancesLoading,
	getInstancesError,

	getItemsLoading,
	getItemsError
} from 'helpers/selectors';

import HeaderContainer from './HeaderContainer';

import Loading from 'components/Utils/Loading';

function Broken() {
	return (
		<div className="">
			Something super duper broke :/
		</div>
	);
}

class GlobalContainer extends Component {
	static propTypes = {
		fetchInstances: PropTypes.func.isRequired,
		fetchItems: PropTypes.func.isRequired,

		isLoading: PropTypes.bool.isRequired,
		isBroken: PropTypes.bool.isRequired,

		children: PropTypes.node
	}

	constructor(props) {
		super(props);

		this.props.fetchInstances();
		this.props.fetchItems();
	}

	render() {
		let content = this.props.children;

		if (this.props.isLoading) content = <Loading isCentered={true} />;
		else if (this.props.isBroken) content = <Broken />;

		return (
			<div className="page-container">
				<HeaderContainer />

				{content}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const isLoading = getInstancesLoading(state) || getItemsLoading(state);
	const isBroken = !!getInstancesError(state) || !!getItemsError(state);

	return {
		isLoading,
		isBroken
	};
}

export default connect(mapStateToProps, {
	fetchInstances,
	fetchItems
})(GlobalContainer);
