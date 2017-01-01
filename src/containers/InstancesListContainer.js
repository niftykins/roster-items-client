import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import InstancesList from 'components/Instances/InstancesList';

const INSTANCES_LIST_QUERY = gql`
	query InstancesList {
		instances {
			id
			wowId
			name
			created
			bosses {
				wowId
				name
			}
		}
	}
`;

export default graphql(INSTANCES_LIST_QUERY, {
	props: ({data: {loading, instances = []}}) => ({
		instances: instances.sort((a, b) => a.created > b.created),
		loading
	}),

	options: () => ({
		reducer: (prev, action) => {
			if (action.type !== 'APOLLO_MUTATION_RESULT') return prev;

			if (action.operationName === 'createInstance') {
				return update(prev, {
					instances: {
						$unshift: [action.result.data.createInstance]
					}
				});
			}

			return prev;
		}
	})
})(InstancesList);
