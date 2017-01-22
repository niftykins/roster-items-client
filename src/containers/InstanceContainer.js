import {connect} from 'react-redux';

import {
	createInstance,
	updateInstance,
	deleteInstance
} from 'actions/instances';

import {getInstance} from 'helpers/selectors';

import Instance from 'components/Instances/Instance';

function mapStateToProps(state, {params}) {
	const instance = getInstance(state, params.instanceId, true);

	return {
		instance
	};
}

export default connect(mapStateToProps, {
	onCreate: createInstance,
	onUpdate: updateInstance,
	onDelete: deleteInstance
})(Instance);
