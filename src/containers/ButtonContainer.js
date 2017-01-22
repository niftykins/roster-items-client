import {connect} from 'react-redux';

import {
	createButton,
	updateButton,
	deleteButton
} from 'actions/buttons';

import {getButton} from 'helpers/selectors';

import ButtonDetails from 'components/Buttons/ButtonDetails';

function mapStateToProps(state, {params}) {
	const button = getButton(state, params.buttonId, true);

	return {
		button
	};
}

export default connect(mapStateToProps, {
	onCreate: createButton,
	onUpdate: updateButton,
	onDelete: deleteButton
})(ButtonDetails);
