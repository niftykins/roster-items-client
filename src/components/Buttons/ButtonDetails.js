import {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Ladda, {EXPAND_RIGHT} from 'react-ladda';

import checkForDisabled from 'helpers/checkForDisabled';

import {ROLES} from 'constants/wow';

import Button from 'models/button';

import Input from '../Utils/Input';
import RoleGroups from '../Utils/RoleGroups';

export default class ButtonDetails extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		onUpdate: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,

		button: PropTypes.instanceOf(Button).isRequired
	}

	constructor(props) {
		super(props);

		this.handleCheckForDisabled = checkForDisabled.bind(this);

		this.fields = {};

		this.state = {
			disabled: props.button.isNew(),
			confirming: false,

			[ROLES.MELEE]: props.button.select[ROLES.MELEE],
			[ROLES.RANGED]: props.button.select[ROLES.RANGED],
			[ROLES.TANKS]: props.button.select[ROLES.TANKS],
			[ROLES.HEALERS]: props.button.select[ROLES.HEALERS]
		};
	}

	checkForDisabled() {
		const totalSize = this.state[ROLES.MELEE].size +
			this.state[ROLES.RANGED].size +
			this.state[ROLES.TANKS].size +
			this.state[ROLES.HEALERS].size;

		if (!totalSize) return true;

		return false;
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

	handleSave = () => {
		const name = this.fields.name.getValue();
		const order = this.fields.order.getValue();

		const select = {
			[ROLES.MELEE]: this.state[ROLES.MELEE].toJS(),
			[ROLES.RANGED]: this.state[ROLES.RANGED].toJS(),
			[ROLES.TANKS]: this.state[ROLES.TANKS].toJS(),
			[ROLES.HEALERS]: this.state[ROLES.HEALERS].toJS()
		};

		if (!name || !order) return;

		const data = {
			order: parseInt(order, 10) || 0,
			select,
			name
		};

		// create or update
		if (this.props.button.isNew()) {
			this.props.onCreate(data);
		} else {
			this.props.onUpdate(this.props.button.id, data);
		}
	}

	render() {
		const {button} = this.props;

		const isDisabled = this.state.disabled || button.isSaving() ||
			button.isDeleting();

		const deleteButtonClassName = classnames({
			disabled: isDisabled
		}, 'red outline button');

		const saveButtonClassName = classnames({
			disabled: isDisabled
		}, 'green button');


		const select = {
			[ROLES.MELEE]: this.state[ROLES.MELEE],
			[ROLES.RANGED]: this.state[ROLES.RANGED],
			[ROLES.TANKS]: this.state[ROLES.TANKS],
			[ROLES.HEALERS]: this.state[ROLES.HEALERS]
		};

		return (
			<div className="view-details-container">
				<div className="view-details-inner">
					<div className="view-details button-details">
						<h1>{button.isNew() ? 'Add new button' : 'Update button'}</h1>

						<div className="card">
							<Input
								onChange={this.handleCheckForDisabled}
								ref={(r) => (this.fields.name = r)}
								defaultValue={button.name}
								placeholder="Plate"
								label="Name"
								autoFocus={true}
							/>

							<Input
								onChange={this.handleCheckForDisabled}
								ref={(r) => (this.fields.order = r)}
								defaultValue={String(button.order)}
								placeholder="0"
								label="Order group"
								labelHint="(buttons with the same order will be grouped together)"
								autoFocus={true}
							/>
						</div>

						<div className="card">
							<RoleGroups
								onToggle={this.handleClassToggle}
								{...select}
							/>
						</div>
					</div>

					<div className="view-actions-bar">
						{this.state.confirming &&
							<div className="button-group">
								<Ladda
									onClick={() => this.props.onDelete(button.id)}
									className={deleteButtonClassName}
									loading={button.isDeleting()}
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
								{!button.isNew() &&
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
									loading={button.isSaving()}
									data-style={EXPAND_RIGHT}
								>
									Save
								</Ladda>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
