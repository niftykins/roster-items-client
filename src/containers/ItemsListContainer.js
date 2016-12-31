import {connect} from 'react-redux';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';

import ItemsList from 'components/Items/ItemsList';

const ITEMS_LIST_QUERY = gql`
	query ItemsList {
		items {
			id
			name
			icon
		}
	}
`;

export default compose(
	graphql(ITEMS_LIST_QUERY, {
		props({data: {loading, items}}) {
			return {
				loading,
				items
			};
		}
	}),

	connect(() => ({}), {

	})
)(ItemsList);
