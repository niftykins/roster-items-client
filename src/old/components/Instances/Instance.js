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
		if (!line) return {};

		const [name, wowId] = line.split(DELIMITER);

		return {
			wowId: wowId && wowId.trim(),
			name: name && name.trim()
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

		console.warn(props.instance, !props.instance);

		this.state = {
			disabled: !props.instance,
			saving: false
		};
	}

	componentWillReceiveProps({instance: next = {}}) {
		const current = this.props.instance || {};

		if (current.id !== next.id) {
			// component might not have rendered yet, so wait a bit
			setTimeout(() => this.updateToNewInstance(next));
		}
	}

	updateToNewInstance = (data = {}) => {
		this.fields.name.setValue(data.name);
		this.fields.wowId.setValue(data.wowId);

		const bosses = formatBosses(data.bosses);
		this.fields.bosses.setValue(bosses);

		this.handleCheckForDisabled();
		this.setState({saving: false});
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

		this.setState({saving: true});
		return;

		// update or create
		let p;
		if (this.props.instance) {
			p = this.props.onUpdate(this.props.instance.id, data);
		} else {
			p = this.props.onCreate(data);
		}

		p.then(() => this.setState({saving: false}));
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