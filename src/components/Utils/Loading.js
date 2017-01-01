import classnames from 'classnames';

export default function Loading({small}) {
	const loaderClassName = classnames({small}, 'loader');

	return (
		<div className={loaderClassName}>
			<div className="r1"></div>
			<div className="r2"></div>
			<div className="r3"></div>
			<div className="r4"></div>
			<div className="r5"></div>
		</div>
	);
}
