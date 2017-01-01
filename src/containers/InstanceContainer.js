import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import Instance from 'components/Instances/Instance';

const CREATE_INSTANCE = gql`
	mutation createInstance($instance: InstanceInput!) {
		createInstance(instance: $instance) {
			id
			wowId
			name
			bosses {
				wowId
				name
			}
		}
	}
`;

const UPDATE_INSTANCE = gql`
	mutation updateInstance($id: ID!, $instance: InstanceInput!) {
		updateInstance(instance: $instance) {
			id
			wowId
			name
			bosses {
				wowId
				name
			}
		}
	}
`;

const FETCH_INSTANCE = gql`
	query InstanceDetails($id: ID!) {
		instance(id: $id) {
			id
			wowId
			name
			bosses {
				wowId
				name
			}
		}
	}
`;

export default compose(
	graphql(CREATE_INSTANCE, {
		props: ({mutate}) => ({
			onCreate: (instance) => mutate({
				variables: {instance}
			})
		})
	}),

	graphql(UPDATE_INSTANCE, {
		props: ({mutate}) => ({
			onUpdate: (id, instance) => mutate({
				variables: {id, instance}
			})
		})
	}),

	graphql(FETCH_INSTANCE, {
		// skip the query if we don't have an id (ie /instances/new)
		skip: ({params}) => !params.instanceId,

		props: ({data: {loading, instance}}) => ({
			instance,
			loading
		}),

		options: ({params}) => ({
			variables: {id: params.instanceId}
		})
	})
)(Instance);
