import {Provider} from 'react-redux';
import makeRouter from '../routes';

export default function Root({store, history}) {
	const router = makeRouter(history);

	return (
		<Provider store={store}>
			{router}
		</Provider>
	);
}
