import {connect} from 'react-redux';

import {
	createInstance,
	updateInstance,
	deleteInstance
} from 'actions/instances';

import {getInstance} from 'helpers/selectors';

import InstanceDetails from 'components/Instances/InstanceDetails';

function mapStateToProps(state, {params}) {
	const instanceId = parseInt(params.instanceId, 10);
	const instance = getInstance(state, instanceId, true);

	return {
		instance
	};
}

export default connect(mapStateToProps, {
	onCreate: createInstance,
	onUpdate: updateInstance,
	onDelete: deleteInstance
})(InstanceDetails);
