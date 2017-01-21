import {Record, List} from 'immutable';

import {DIFFICULTIES} from 'constants/wow';

const Boss = Record({
	wowId: '',
	name: ''
});

const WowheadBonuses = Record({
	[DIFFICULTIES.NORMAL]: '0',
	[DIFFICULTIES.HEROIC]: '0',
	[DIFFICULTIES.MYTHIC]: '0'
});

const Instance = Record({
	id: '',

	wowId: '',
	name: '',

	wowheadBonuses: new WowheadBonuses(),
	bosses: List(),

	__isSaving: false
});

class InstanceWrapper extends Instance {
	static savingKey = '__isSaving'

	constructor(data = {}) {
		const instance = {
			...data,

			wowheadBonuses: new WowheadBonuses(data.wowheadBonuses),
			bosses: List(data.bosses && data.bosses.map((b) => new Boss(b)))
		};

		super(instance);
	}

	merge(...args) {
		const fixed = args.map((data) => {
			const merge = {...data};

			if (merge.wowheadBonuses) {
				merge.wowheadBonuses = new WowheadBonuses(data.wowheadBonuses);
			}

			if (merge.bosses) {
				merge.bosses = List(data.bosses.map((b) => new Boss(b)));
			}

			return merge;
		});

		return super.merge(...fixed);
	}

	isNew() {
		return !this.id;
	}

	isSaving() {
		return this[this.constructor.savingKey];
	}
}

export default InstanceWrapper;
