import {connect} from 'react-redux';

import {getItems} from 'helpers/selectors';

import ItemsList from 'components/Items/ItemsList';

function mapStateToProps(state) {
	return {
		items: getItems(state)
	};
}

export default connect(mapStateToProps)(ItemsList);
