import {PropTypes} from 'react';
import {Link} from 'react-router';
import logo from 'images/unicorn256.png';

export default function Header({onLogin, onLogout, client, user}) {
	return (
		<div className="header-nav">
			<div className="brand">
				<img src={logo} />

				<span className="name">
					Item Management
				</span>
			</div>

			<div className="links">
				<Link
					to="/instances"
					activeClassName="active"
				>
					Instances
				</Link>

				<Link
					to="/"
					activeClassName="active"
				>
					Items
				</Link>

				<Link
					to="/issues"
					activeClassName="active"
				>
					Issues
				</Link>

				<UserButton
					onLogin={onLogin}
					onLogout={() => onLogout(client)}
					user={user}
				/>
			</div>
		</div>
	);
}

Header.propTypes = {
	onLogin: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,

	client: PropTypes.object.isRequired,
	user: PropTypes.shape({
		battletag: PropTypes.string.isRequired
	})
};


function UserButton({onLogin, onLogout, user}) {
	if (user) {
		return (
			<div onClick={onLogout}>
				{user.battletag}
			</div>
		);
	}

	return (
		<div onClick={onLogin}>
			Log in
		</div>
	);
}
