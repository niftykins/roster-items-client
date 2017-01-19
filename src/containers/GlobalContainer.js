import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchInstances} from 'actions/instances';

import {getInstanceLoading, getInstanceError} from 'helpers/selectors';

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

		isLoading: PropTypes.bool.isRequired,
		isBroken: PropTypes.bool.isRequired,

		children: PropTypes.node
	}

	constructor(props) {
		super(props);

		this.props.fetchInstances();
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
	const isLoading = getInstanceLoading(state);
	const isBroken = !!getInstanceError(state);

	return {
		isLoading,
		isBroken
	};
}

export default connect(mapStateToProps, {
	fetchInstances
})(GlobalContainer);
