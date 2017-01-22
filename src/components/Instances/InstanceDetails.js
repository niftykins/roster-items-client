import {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Ladda, {EXPAND_RIGHT} from 'react-ladda';

import checkForDisabled from 'helpers/checkForDisabled';

import {DIFFICULTIES} from 'constants/wow';

import Instance from 'models/instance';

import Input from '../Utils/Input';

const DELIMITER = '@';


function formatBonuses(bonuses) {
	return [bonuses[DIFFICULTIES.NORMAL], bonuses[DIFFICULTIES.HEROIC], bonuses[DIFFICULTIES.MYTHIC]].join(',');
}

function extractBonuses(text) {
	const bonuses = text.split(',');

	return {
		[DIFFICULTIES.NORMAL]: (bonuses[0] || '0').trim(),
		[DIFFICULTIES.HEROIC]: (bonuses[1] || '0').trim(),
		[DIFFICULTIES.MYTHIC]: (bonuses[2] || '0').trim()
	};
}

function validateBonuses(bonuses) {
	return bonuses[DIFFICULTIES.NORMAL] && bonuses[DIFFICULTIES.HEROIC] &&
		bonuses[DIFFICULTIES.MYTHIC];
}

function formatBosses(bosses = []) {
	return bosses.map((b) => `${b.name} ${DELIMITER} ${b.wowId}`).join('\n');
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


export default class InstanceDetails extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		onUpdate: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,

		instance: PropTypes.instanceOf(Instance)
	}

	constructor(props) {
		super(props);

		this.handleCheckForDisabled = checkForDisabled.bind(this);

		this.fields = {};

		this.state = {
			disabled: props.instance.isNew(),
			confirming: false
		};
	}

	handleSave = () => {
		const name = this.fields.name.getValue();
		const wowId = this.fields.wowId.getValue();

		const bossText = this.fields.bosses.getValue();
		const bosses = extractBosses(bossText);

		const bonusesText = this.fields.bonuses.getValue();
		const bonuses = extractBonuses(bonusesText);

		if (!name || !wowId || !validateBosses(bosses) ||
			!validateBonuses(bonuses)) {
			return;
		}

		const data = {
			wowheadBonuses: bonuses,
			bosses,
			wowId,
			name
		};

		// create or update
		if (this.props.instance.isNew()) {
			this.props.onCreate(data);
		} else {
			this.props.onUpdate(this.props.instance.id, data);
		}
	}

	render() {
		const {instance} = this.props;

		const isDisabled = this.state.disabled || instance.isSaving() ||
			instance.isDeleting();

		const deleteButtonClassName = classnames({
			disabled: isDisabled
		}, 'red outline button');

		const saveButtonClassName = classnames({
			disabled: isDisabled
		}, 'green button');

		return (
			<div className="view-details-container">
				<div className="view-details instance-details">
					<h1>{instance.isNew() ? 'Add new instance' : 'Update instance'}</h1>

					<div className="card">
						<Input
							onChange={this.handleCheckForDisabled}
							ref={(r) => (this.fields.name = r)}
							defaultValue={instance.name}
							placeholder="Trial of Ulduarazan"
							label="Name"
							autoFocus={true}
						/>

						<Input
							onChange={this.handleCheckForDisabled}
							ref={(r) => (this.fields.wowId = r)}
							defaultValue={instance.wowId}
							placeholder="1337"
							label="ID"
						/>

						<Input
							onChange={this.handleCheckForDisabled}
							ref={(r) => (this.fields.release = r)}
							defaultValue={instance.release}
							placeholder="1485071793710"
							label="Release time"
							labelHint="(generally the default value will do)"
							note="This should just be a timestamp from around release date, but doesn't need to be exact"
						/>

						<Input
							onChange={this.handleCheckForDisabled}
							ref={(r) => (this.fields.bonuses = r)}
							defaultValue={formatBonuses(instance.wowheadBonuses)}
							placeholder="0,3444,3445"
							label="Wowhead Bonus IDs"
							labelHint="(normal, heroic, mythic)"
						/>

						<Input
							onChange={this.handleCheckForDisabled}
							ref={(r) => (this.fields.bosses = r)}
							defaultValue={formatBosses(instance.bosses)}
							placeholder={`Algalon the Observer ${DELIMITER} 32871`}
							textareaProps={{minRows: 10}}
							textarea={true}
							label="Bosses"
							note={`One boss per line in the format: name${DELIMITER}id`}
						/>
					</div>
				</div>

				<div className="view-actions-bar">
					{this.state.confirming &&
						<div className="button-group">
							<Ladda
								onClick={() => this.props.onDelete(instance.id)}
								className={deleteButtonClassName}
								loading={instance.isDeleting()}
								data-style={EXPAND_RIGHT}
							>
								Confirm
							</Ladda>

							<div
								onClick={() => this.setState({confirming: false})}
								className="outline button"
							>
								Cancel
							</div>
						</div>
					}

					{!this.state.confirming &&
						<div className="button-group">
							{!instance.isNew() &&
								<div
									onClick={() => this.setState({confirming: true})}
									className={deleteButtonClassName}
								>
									Remove
								</div>
							}

							<Ladda
								onClick={this.handleSave}
								className={saveButtonClassName}
								loading={instance.isSaving()}
								data-style={EXPAND_RIGHT}
							>
								Save
							</Ladda>
						</div>
					}
				</div>
			</div>
		);
	}
}
