import HeaderContainer from 'containers/HeaderContainer';
import ItemsListContainer from 'containers/ItemsListContainer';
import ItemContainer from 'containers/ItemContainer';

export default function ItemsView() {
	return (
		<div className="page-container">
			<HeaderContainer />

			<div className="standard-view items-view">
				<ItemsListContainer />

				<ItemContainer />
			</div>
		</div>
	);
}
