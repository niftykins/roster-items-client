import {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import Ladda, {EXPAND_RIGHT} from 'react-ladda';

import checkForDisabled from 'helpers/checkForDisabled';

import {ROLES, SLOTS} from 'constants/wow';

import Button from 'models/button';
import Item from 'models/item';

import RoleGroups from '../Utils/RoleGroups';
import Picker from '../Utils/Picker';
import Input from '../Utils/Input';

const SLOT_ITEMS = Object.values(SLOTS).map((s) => ({id: s, name: s}));

export default class ItemDetails extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		onUpdate: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,

		item: PropTypes.instanceOf(Item).isRequired,

		sourceOptions: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			child: PropTypes.bool
		})).isRequired,

		buttons: ImmutablePropTypes.listOf(ImmutablePropTypes.listOf(
			PropTypes.instanceOf(Button)
		)).isRequired
	}

	constructor(props) {
		super(props);

		this.handleCheckForDisabled = checkForDisabled.bind(this);

		this.fields = {};

		this.state = {
			disabled: props.item.isNew(),
			confirming: false,

			sourceId: props.item.sourceId,
			slot: props.item.slot,

			[ROLES.MELEE]: props.item.allowed[ROLES.MELEE],
			[ROLES.RANGED]: props.item.allowed[ROLES.RANGED],
			[ROLES.TANKS]: props.item.allowed[ROLES.TANKS],
			[ROLES.HEALERS]: props.item.allowed[ROLES.HEALERS]
		};
	}

	checkForDisabled() {
		if (!this.state.sourceId) return true;
		if (!this.state.slot) return true;

		const totalSize = this.state[ROLES.MELEE].size +
			this.state[ROLES.RANGED].size +
			this.state[ROLES.TANKS].size +
			this.state[ROLES.HEALERS].size;

		if (!totalSize) return true;

		return false;
	}

	handleAutofill = () => {
		console.log(this.autofill.getValue());
	}

	handleClassToggle = (role, cls) => {
		const list = this.state[role];
		const index = list.indexOf(cls);

		let newList;
		if (index === -1) {
			newList = list.push(cls);
		} else {
			newList = list.delete(index);
		}

		this.setState({[role]: newList}, this.handleCheckForDisabled);
	}

	handleButton = (select, isReset) => {
		const update = {};

		if (isReset) {
			Object.values(ROLES).forEach((role) => {
				update[role] = this.state[role].clear();
			});
		} else {
			Object.values(ROLES).forEach((role) => {
				const selectRole = select[role];
				const stateRole = this.state[role];

				if (!stateRole || !selectRole) return;

				update[role] = stateRole.push(...selectRole).toSet().toList();
			});
		}

		this.setState(update, this.handleCheckForDisabled);
	}

	handleSourceChange = (sourceId) => {
		this.setState({sourceId}, this.handleCheckForDisabled);
	}

	handleSlotChange = (slot) => {
		this.setState({slot}, this.handleCheckForDisabled);
	}

	handleSave = () => {
		const name = this.fields.name.getValue();
		const wowId = this.fields.wowId.getValue();

		const sourceId = this.state.sourceId;
		const slot = this.state.slot;

		const allowed = {
			[ROLES.MELEE]: this.state[ROLES.MELEE].toJS(),
			[ROLES.RANGED]: this.state[ROLES.RANGED].toJS(),
			[ROLES.TANKS]: this.state[ROLES.TANKS].toJS(),
			[ROLES.HEALERS]: this.state[ROLES.HEALERS].toJS()
		};

		if (!name || !wowId || !sourceId || !slot) return;

		const data = {
			sourceId,
			allowed,
			wowId,
			name,
			slot
		};

		// create or update
		if (this.props.item.isNew()) {
			this.props.onCreate(data);
		} else {
			this.props.onUpdate(this.props.item.id, data);
		}
	}

	render() {
		const {item} = this.props;

		const isDisabled = this.state.disabled || item.isSaving() ||
			item.isDeleting();

		const deleteButtonClassName = classnames({
			disabled: isDisabled
		}, 'red outline button');

		const saveButtonClassName = classnames({
			disabled: isDisabled
		}, 'green button');


		const allowed = {
			[ROLES.MELEE]: this.state[ROLES.MELEE],
			[ROLES.RANGED]: this.state[ROLES.RANGED],
			[ROLES.TANKS]: this.state[ROLES.TANKS],
			[ROLES.HEALERS]: this.state[ROLES.HEALERS]
		};

		return (
			<div className="view-details-container">
				<div className="view-details-inner">
					<div className="view-details items-details">
						<h1>{item.isNew() ? 'Add new item' : 'Update item'}</h1>

						<div className="card">
							<Input
								onSubmit={this.handleAutofill}
								ref={(r) => (this.autofill = r)}
								label="Autofill from Wowhead"
								note="Paste a link to the item on Wowhead and we'll attempt to automatically fill in some values based on the information we get back from Wowhead."
								placeholder="http://www.wowhead.com/item=140793/perfectly-preserved-cake"
								withActionButton={true}
								autoFocus={true}
							>
								<div
									className="green button"
									onClick={this.handleAutofill}
								>
									Go
								</div>
							</Input>
						</div>

						<div className="card">
							<Input
								onChange={this.handleCheckForDisabled}
								ref={(r) => (this.fields.name = r)}
								defaultValue={item.name}
								placeholder="Perfectly Preserved Cake"
								label="Name"
							/>

							<Input
								onChange={this.handleCheckForDisabled}
								ref={(r) => (this.fields.wowId = r)}
								defaultValue={item.wowId}
								placeholder="140793"
								label="ID"
							/>

							<Picker
								onChange={this.handleSourceChange}
								placeholder="Select a source"
								value={this.state.sourceId}
								items={this.props.sourceOptions}
								label="Drops from"
								labelHint="(selecting an instance implies a trash drop)"
							/>

							<Picker
								onChange={this.handleSlotChange}
								placeholder="Select a slot"
								value={this.state.slot}
								items={SLOT_ITEMS}
								label="Slot"
							/>
						</div>

						<div className="card">
							<RoleGroups
								onToggle={this.handleClassToggle}
								{...allowed}
							/>
						</div>
					</div>

					<div className="view-actions-bar">
						{this.state.confirming &&
							<div className="button-group">
								<Ladda
									onClick={() => this.props.onDelete(item.id)}
									className={deleteButtonClassName}
									loading={item.isDeleting()}
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
								{!item.isNew() &&
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
									loading={item.isSaving()}
									data-style={EXPAND_RIGHT}
								>
									Save
								</Ladda>
							</div>
						}
					</div>
				</div>

				<ButtonPanel
					onClick={this.handleButton}
					buttons={this.props.buttons}
				/>
			</div>
		);
	}
}

function ButtonPanel({onClick, buttons}) {
	const groups = buttons.map((group, i) => {
		const buttonItems = group.map((button) => (
			<div
				key={button.id}
				onClick={() => onClick(button.select)}
				className="small outline button"
			>
				{button.name}
			</div>
		));

		return (
			<div
				key={i}
				className="button-group"
			>
				{buttonItems}
			</div>
		);
	});

	return (
		<div className="view-right-panel">
			{groups}

			<div className="button-group">
				<div
					onClick={() => onClick(null, true)}
					className="small red outline button"
				>
					Clear selections
				</div>
			</div>
		</div>
	);
}
