import {connect} from 'react-redux';

import {getButtons} from 'helpers/selectors';

import ButtonsList from 'components/Buttons/ButtonsList';

function mapStateToProps(state) {
	return {
		buttons: getButtons(state)
	};
}

export default connect(mapStateToProps)(ButtonsList);
