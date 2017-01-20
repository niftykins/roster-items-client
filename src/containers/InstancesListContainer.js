import {connect} from 'react-redux';

import {getInstances} from 'helpers/selectors';

import InstancesList from 'components/Instances/InstancesList';

function mapStateToProps(state) {
	return {
		instances: getInstances(state)
	};
}

export default connect(mapStateToProps)(InstancesList);
