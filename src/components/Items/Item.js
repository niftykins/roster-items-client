import {Component} from 'react';
import classnames from 'classnames';
import update from 'immutability-helper';

import {SLOTS, CLASSES, CLASSES_DISPLAY, ROLES} from 'constants/wow';

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

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.fields = {};

		this.state = {
			slot: '',

			melee: [],
			ranged: [],
			healers: [],
			tanks: []
		};
	}

	handleAutofill = () => {
		console.log(this.inputs.autofill.getValue());
	}

	handleToggleClass = (role, cls) => {
		const r = this.state[role];
		const i = r.indexOf(cls);

		if (i === -1) {
			this.setState({[role]: update(r, {$push: [cls]})});
		} else {
			this.setState({[role]: update(r, {$splice: [[i, 1]]})});
		}
	}

	render() {
		const roleGroups = ROLE_GROUPS.map((group) => (
			<RoleGroup
				key={group.role}
				onToggle={this.handleToggleClass}
				toggled={this.state[group.role]}
				{...group}
			/>
		));

		return (
			<div className="view-details-container">
				<div className="view-details items-details">
					<h1>Add new item</h1>

					<div className="card">
						<Input
							ref={(r) => (this.fields.autofill = r)}
							label="Autofill from Wowhead"
							note="Paste a link to the item on Wowhead and we'll attempt to automatically fill in some values based on the information we get back from Wowhead."
							placeholder="http://www.wowhead.com/item=142422/radiant-soul-sabatons"
							withActionButton={true}
							onSubmit={this.handleAutofill}
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
							ref={(r) => (this.fields.name = r)}
							placeholder="Radiant Soul Sabatons"
							label="Name"
						/>

						<Input
							ref={(r) => (this.fields.id = r)}
							placeholder="142422"
							label="ID"
						/>

						<Picker
							onChange={(slot) => this.setState({slot})}
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
			</div>
		);
	}
}

function RoleGroup({onToggle, toggled, role, classes}) {
	const classItems = classes.map((cls) => (
		<Class
			key={cls}
			onToggle={() => onToggle(role, cls)}
			toggled={toggled.includes(cls)}
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

function Class({onToggle, toggled, cls}) {
	const toggleClassName = classnames({toggled}, 'material-icons');

	return (
		<div
			className="class"
			onClick={onToggle}
		>
			<i className={toggleClassName}>
				{toggled ? 'check_box' : 'check_box_outline_blank'}
			</i>

			<span className={`wow-style class-font class${cls}`}>
				{CLASSES_DISPLAY[cls]}
			</span>
		</div>
	);
}
