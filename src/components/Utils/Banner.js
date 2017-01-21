import classnames from 'classnames';

export default function Banner({banner: {message, type, show}}) {
	const bannerClass = classnames({show}, type, 'status-banner');

	return (
		<div className={bannerClass}>
			{message}
		</div>
	);
}
