import {Router, Route, IndexRedirect} from 'react-router';

import GlobalContainer from 'containers/GlobalContainer';

// import ItemsView from 'components/Items/ItemsView';
// import IssuesView from 'components/Issues/IssuesView';

import InstancesView from 'components/Instances/InstancesView';
// import InstanceContainer from 'containers/InstanceContainer';

export default function makeRouter(history) {
	return (
		<Router history={history}>
			<Route component={GlobalContainer}>
				<Route path="/" component={InstancesView} />
			</Route>
		</Router>
	);
}

// <Route path="/" component={ItemsView} />

// <Route path="/issues" component={IssuesView} />

// <Route path="/instances" component={InstancesView}>
// 	<IndexRedirect to="new" />

// 	<Route path="new" component={InstanceContainer} />
// 	<Route path=":instanceId" component={InstanceContainer} />
// </Route>
