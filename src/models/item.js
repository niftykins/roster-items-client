import {Record, List} from 'immutable';

import {ROLES} from 'constants/wow';

const Allowed = Record({
	[ROLES.MELEE]: List(),
	[ROLES.RANGED]: List(),
	[ROLES.TANKS]: List(),
	[ROLES.HEALERS]: List()
});

const Item = Record({
	id: '',

	wowId: '',
	name: '',
	sourceId: '',
	slot: '',

	allowed: new Allowed(),

	__isSaving: false,
	__isDeleting: false
});


function fixData(data = {}) {
	const fixed = {...data};

	if (data.allowed) {
		const allowed = {};
		Object.keys(data.allowed).forEach((key) => {
			allowed[key] = List(data.allowed[key]);
		});

		fixed.allowed = new Allowed(allowed);
	}

	return fixed;
}

class ItemWrapper extends Item {
	static savingKey = '__isSaving'
	static deletingKey = '__isDeleting'

	constructor(data) {
		super(fixData(data));
	}

	merge(...args) {
		return super.merge(...args.map((data) => fixData(data)));
	}

	isNew() {
		return !this.id;
	}

	isSaving() {
		return this[this.constructor.savingKey];
	}

	isDeleting() {
		return this[this.constructor.deletingKey];
	}
}

export default ItemWrapper;
