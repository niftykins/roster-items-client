import {Component, PropTypes} from 'react';

import Loading from '../Utils/Loading';
import Input from '../Utils/Input';

export default class Instance extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		onUpdate: PropTypes.func.isRequired,

		loading: PropTypes.bool,
		instance: PropTypes.shape({
			id: PropTypes.string.isRequired,
			wowId: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			bosses: PropTypes.arrayOf(PropTypes.shape({
				wowId: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})).isRequired
		})
	}

	constructor(props) {
		super(props);

		this.fields = {};
	}

	componentWillReceiveProps({instance: next = {}}) {
		const current = this.props.instance || {};

		if (current.id !== next.id) this.setFields(next);
	}

	setFields = (data = {}) => {
		if (this.fields.name) this.fields.name.setValue(data.name);
		if (this.fields.wowId) this.fields.wowId.setValue(data.wowId);
	}

	handleSave = () => {
		const name = this.fields.name.getValue();
		const wowId = this.fields.wowId.getValue();

		if (!name || !wowId) return;

		const data = {
			bosses: [],
			wowId,
			name
		};

		// update or create
		if (this.props.instance) {
			this.props.onUpdate(this.props.instance.id, data);
		} else {
			this.props.onCreate(data);
		}
	}

	render() {
		if (this.props.loading) return <Loading />;

		const {instance} = this.props;

		return (
			<div className="view-details-container">
				<div className="view-details instance-details">
					{instance ?
						<h1>Update instance</h1>
					:
						<h1>Add new instance</h1>
					}

					<div className="card">
						<Input
							ref={(r) => (this.fields.name = r)}
							defaultValue={instance && instance.name}
							placeholder="Trial of Ulduarazan"
							label="Name"
							autoFocus={true}
						/>

						<Input
							ref={(r) => (this.fields.wowId = r)}
							defaultValue={instance && instance.wowId}
							placeholder="1337"
							label="ID"
						/>
					</div>
				</div>

				<div className="view-actions-bar">
					<div
						className="green button"
						onClick={this.handleSave}
					>
						Save
					</div>
				</div>
			</div>
		);
	}
}
