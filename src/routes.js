import {Router, Route, IndexRedirect} from 'react-router';

import GlobalContainer from 'containers/GlobalContainer';

import ItemsView from 'components/Items/ItemsView';
import ItemContainer from 'containers/ItemContainer';

import InstancesView from 'components/Instances/InstancesView';
import InstanceContainer from 'containers/InstanceContainer';

export default function makeRouter(history) {
	return (
		<Router history={history}>
			<Route path="/" component={GlobalContainer}>
				<IndexRedirect to="items" />

				<Route path="/items" component={ItemsView}>
					<IndexRedirect to="new" />

					<Route path="new" component={ItemContainer} />
					<Route path=":itemId" component={ItemContainer} />
				</Route>

				<Route path="/instances" component={InstancesView}>
					<IndexRedirect to="new" />

					<Route path="new" component={InstanceContainer} />
					<Route path=":instanceId" component={InstanceContainer} />
				</Route>
			</Route>
		</Router>
	);
}
