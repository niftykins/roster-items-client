import {Router, Route/* , IndexRedirect */} from 'react-router';

import SignInContainer from 'containers/SignInContainer';

export default function makeRouter(history) {
	return (
		<Router history={history}>
			<Route path="/sign-in" component={SignInContainer} />
		</Router>
	);
}
