import {connect} from 'react-redux';

import {loginWithBlizzard} from 'actions/auth';

import SignIn from 'components/Auth/SignIn';

function mapStateToProps() {
	return {};
}

export default connect(mapStateToProps, {
	onLogin: loginWithBlizzard
})(SignIn);
