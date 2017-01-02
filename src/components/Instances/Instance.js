import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import checkForDisabled from 'helpers/checkForDisabled';

import Loading from '../Utils/Loading';
import Input from '../Utils/Input';

const DELIMITER = '@';

function formatBosses(bosses = []) {
	return bosses.map((b) => `${b.name}${DELIMITER}${b.wowId}`).join('\n');
}

function extractBosses(text) {
	return text.split(/\r?\n/).map((line) => {
		const [name, wowId] = line.split(DELIMITER);
		return {
			wowId: wowId.trim(),
			name: name.trim()
		};
	});
}

// does minimal validation ensuring each boss has a name and wowId
function validateBosses(bosses) {
	return bosses.every((boss) => boss.name && boss.wowId);
}


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

		this.handleCheckForDisabled = checkForDisabled.bind(this);

		this.fields = {};

		this.state = {
			disabled: !props.instance
		};
	}

	componentWillReceiveProps({instance: next = {}}) {
		const current = this.props.instance || {};

		if (current.id !== next.id) this.updateFieldsToNewValues(next);
	}

	updateFieldsToNewValues = (data = {}) => {
		if (this.fields.name) this.fields.name.setValue(data.name);
		if (this.fields.wowId) this.fields.wowId.setValue(data.wowId);

		if (this.fields.bosses) {
			const bosses = formatBosses(data.bosses);
			this.fields.bosses.setValue(bosses);
		}

		this.handleCheckForDisabled();
	}

	handleSave = () => {
		const name = this.fields.name.getValue();
		const wowId = this.fields.wowId.getValue();

		const bossText = this.fields.bosses.getValue();
		const bosses = extractBosses(bossText);

		if (!name || !wowId || !validateBosses(bosses)) return;

		const data = {
			bosses,
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

		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button');

		return (
			<div className="view-details-container">
				<div className="view-details instance-details">
					<h1>{instance ? 'Update instance' : 'Add new instance'}</h1>

					<div className="card">
						<Input
							ref={(r) => (this.fields.name = r)}
							defaultValue={instance && instance.name}
							placeholder="Trial of Ulduarazan"
							label="Name"
							autoFocus={true}
							onChange={this.handleCheckForDisabled}
						/>

						<Input
							ref={(r) => (this.fields.wowId = r)}
							defaultValue={instance && instance.wowId}
							placeholder="1337"
							label="ID"
							onChange={this.handleCheckForDisabled}
						/>

						<Input
							ref={(r) => (this.fields.bosses = r)}
							defaultValue={instance && formatBosses(instance.bosses)}
							placeholder={`Algalon the Observer${DELIMITER}32871`}
							textareaProps={{minRows: 10}}
							textarea={true}
							label="Bosses"
							note={`One boss per line in the format: name${DELIMITER}id`}
							onChange={this.handleCheckForDisabled}
						/>
					</div>
				</div>

				<div className="view-actions-bar">
					<div
						className={buttonClassName}
						onClick={this.handleSave}
					>
						Save
					</div>
				</div>
			</div>
		);
	}
}
