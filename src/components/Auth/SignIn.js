export default function SignIn({onLogin}) {
	return (
		<div className="sign-in-page">
			<div className="card">
				<h1>Sign into Guildsy</h1>

				<div
					className="large blue button"
					onClick={onLogin}
				>
					Sign In with Battle.net
				</div>
			</div>
		</div>
	);
}
