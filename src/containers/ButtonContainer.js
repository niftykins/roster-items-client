import {connect} from 'react-redux';

import {
	createButton,
	updateButton,
	deleteButton
} from 'actions/buttons';

import {getButton} from 'helpers/selectors';

import ButtonDetails from 'components/Buttons/ButtonDetails';

function mapStateToProps(state, {params}) {
	const buttonId = parseInt(params.buttonId, 10);
	const button = getButton(state, buttonId, true);

	return {
		button
	};
}

export default connect(mapStateToProps, {
	onCreate: createButton,
	onUpdate: updateButton,
	onDelete: deleteButton
})(ButtonDetails);
