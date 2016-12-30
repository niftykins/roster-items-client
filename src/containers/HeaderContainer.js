import {connect} from 'react-redux';
import {compose, withApollo, graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {login, logout} from 'actions/auth';

import Header from 'components/Header/Header';

const USER_QUERY = gql`
	query CurrentUserForHeader {
		currentUser {
			battletag
		}
	}
`;

export default compose(
	withApollo,

	graphql(USER_QUERY, {
		props({data: {loading, currentUser}}) {
			return {
				user: currentUser,
				loading
			};
		}
	}),

	connect(() => ({}), {
		onLogout: logout,
		onLogin: login
	})
)(Header);
