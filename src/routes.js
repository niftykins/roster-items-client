import {Router, Route, Redirect} from 'react-router';

import SignInContainer from 'containers/SignInContainer';

export default function makeRouter(history) {
	return (
		<Router history={history}>
			<Redirect from="/" to="/sign-in" />

			<Route path="/sign-in" component={SignInContainer} />
		</Router>
	);
}
