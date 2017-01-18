import HeaderContainer from 'containers/HeaderContainer';
import InstancesListContainer from 'containers/InstancesListContainer';

export default function InstancesView({children}) {
	return (
		<div className="page-container">
			<HeaderContainer />

			<div className="standard-view instances-view">
				<InstancesListContainer />

				{children}
			</div>
		</div>
	);
}
