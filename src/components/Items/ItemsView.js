// import ItemsListContainer from 'containers/ItemsListContainer';

export default function ItemsView({children}) {
	return (
		<div className="standard-view items-view">
			{/* <ItemsListContainer /> */}

			{children}
		</div>
	);
}
