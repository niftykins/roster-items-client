import {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Ladda, {EXPAND_RIGHT} from 'react-ladda';

import checkForDisabled from 'helpers/checkForDisabled';

import {SLOTS, CLASSES, CLASSES_DISPLAY, ROLES} from 'constants/wow';

import Item from 'models/item';

import Input from '../Utils/Input';
import Picker from '../Utils/Picker';

const SLOT_ITEMS = Object.values(SLOTS).map((s) => ({id: s, name: s}));

const ROLE_GROUPS = [
	{
		role: ROLES.MELEE,
		classes: [
			CLASSES.DEATH_KNIGHT,
			CLASSES.PALADIN,
			CLASSES.WARRIOR,
			CLASSES.SHAMAN,
			CLASSES.DEMON_HUNTER,
			CLASSES.DRUID,
			CLASSES.MONK,
			CLASSES.ROGUE
		]
	},

	{
		role: ROLES.RANGED,
		classes: [
			CLASSES.HUNTER,
			CLASSES.SHAMAN,
			CLASSES.DRUID,
			CLASSES.MAGE,
			CLASSES.PRIEST,
			CLASSES.WARLOCK
		]
	},

	{
		role: ROLES.HEALERS,
		classes: [
			CLASSES.PALADIN,
			CLASSES.SHAMAN,
			CLASSES.DRUID,
			CLASSES.MONK,
			CLASSES.PRIEST
		]
	},

	{
		role: ROLES.TANKS,
		classes: [
			CLASSES.DEATH_KNIGHT,
			CLASSES.PALADIN,
			CLASSES.WARRIOR,
			CLASSES.DEMON_HUNTER,
			CLASSES.DRUID,
			CLASSES.MONK
		]
	}
];

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
		})).isRequired
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


		const roleGroups = ROLE_GROUPS.map((group) => (
			<RoleGroup
				key={group.role}
				onToggle={this.handleClassToggle}
				selected={this.state[group.role]}
				{...group}
			/>
		));

		return (
			<div className="view-details-container">
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
						<div className="role-groups">
							{roleGroups}
						</div>
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
		);
	}
}

function RoleGroup({onToggle, selected, role, classes}) {
	const classItems = classes.map((cls) => (
		<Class
			key={cls}
			onToggle={() => onToggle(role, cls)}
			isToggled={selected.includes(cls)}
			cls={cls}
		/>
	));

	return (
		<div className="role-group">
			<div className="role-label">
				{role}
			</div>

			{classItems}
		</div>
	);
}

function Class({onToggle, isToggled, cls}) {
	const toggleClassName = classnames({toggled: isToggled}, 'material-icons');

	return (
		<div
			className="class"
			onClick={onToggle}
		>
			<i className={toggleClassName}>
				{isToggled ? 'check_box' : 'check_box_outline_blank'}
			</i>

			<span className={`wow-style class-font ${cls}`}>
				{CLASSES_DISPLAY[cls]}
			</span>
		</div>
	);
}
