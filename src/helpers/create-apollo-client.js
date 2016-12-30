import ApolloClient, {createNetworkInterface} from 'apollo-client';

export default function createApolloClient() {
	const networkInterface = createNetworkInterface({
		uri: `${process.env.API_URL}/graphql`,
		transportBatching: true,

		opts: {credentials: 'include'}
	});

	return new ApolloClient({
		addTypename: true,
		networkInterface,

		dataIdFromObject(result) {
			if (result.id && result.__typename) {
				return result.__typename + result.id;
			}

			return null;
		}
	});
}
