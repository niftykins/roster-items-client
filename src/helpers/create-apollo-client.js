import ApolloClient, {createNetworkInterface, toIdValue} from 'apollo-client';

function dataIdFromObject(result) {
	if (result.id && result.__typename) {
		return `${result.__typename}:${result.id}`;
	}

	return null;
}

export default function createApolloClient() {
	const networkInterface = createNetworkInterface({
		uri: `${process.env.API_URL}/graphql`,
		transportBatching: true,

		opts: {credentials: 'include'}
	});

	return new ApolloClient({
		connectToDevTools: true,
		addTypename: true,
		networkInterface,
		dataIdFromObject,

		customResolvers: {
			Query: {
				instance(root, args) {
					return toIdValue(dataIdFromObject({
						__typename: 'Instance',
						id: args.id
					}));
				}
			}
		}
	});
}
