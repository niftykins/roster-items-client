import {Record, List} from 'immutable';

import {DIFFICULTIES} from 'constants/wow';

const Boss = Record({
	id: '',
	name: ''
});

const WowheadBonuses = Record({
	[DIFFICULTIES.NORMAL]: '0',
	[DIFFICULTIES.HEROIC]: '0',
	[DIFFICULTIES.MYTHIC]: '0'
});

const Instance = Record({
	id: '',
	name: '',

	wowheadBonuses: new WowheadBonuses(),
	bosses: List()
});

class InstanceWrapper extends Instance {
	constructor(data = {}) {
		const instance = {
			...data,

			wowheadBonuses: new WowheadBonuses(data.wowheadBonuses),
			bosses: List(data.bosses && data.bosses.map((b) => new Boss(b)))
		};

		super(instance);
	}
}

export default InstanceWrapper;
