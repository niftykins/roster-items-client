import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchButtons} from 'actions/buttons';
import {fetchInstances} from 'actions/instances';
import {fetchItems} from 'actions/items';

import {
	getButtonsLoading,
	getButtonsError,

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
		fetchButtons: PropTypes.func.isRequired,
		fetchInstances: PropTypes.func.isRequired,
		fetchItems: PropTypes.func.isRequired,

		isLoading: PropTypes.bool.isRequired,
		isBroken: PropTypes.bool.isRequired,

		children: PropTypes.node
	}

	constructor(props) {
		super(props);

		this.props.fetchButtons();
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

function getLoading(state) {
	return getButtonsLoading(state) ||
		getInstancesLoading(state) ||
		getItemsLoading(state);
}

function getError(state) {
	return !!getButtonsError(state) ||
		!!getInstancesError(state) ||
		!!getItemsError(state);
}

function mapStateToProps(state) {
	return {
		isLoading: getLoading(state),
		isBroken: getError(state)
	};
}

export default connect(mapStateToProps, {
	fetchButtons,
	fetchInstances,
	fetchItems
})(GlobalContainer);
