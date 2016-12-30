import {Router, Route} from 'react-router';

import ItemsView from 'components/Items/ItemsView';

import IssuesView from 'components/Issues/IssuesView';

export default function makeRouter(history) {
	return (
		<Router history={history}>
			<Route path="/" component={ItemsView} />

			<Route path="/issues" component={IssuesView} />
		</Router>
	);
}
