import {DIFFICULTIES, CLASSES, ROLES} from './wow';

const typeCounts = {};
export function newId(type = '') {
	if (!typeCounts[type]) typeCounts[type] = 0;

	const count = typeCounts[type] += 1;
	return `${type}${count}`;
}

export const user = {
	id: 'batman',

	accountId: 'abc123',
	battletag: 'batman#1234'
};

export const instances = [
	{
		id: newId('instance'),

		wowId: '8025',
		name: 'The Nighthold',
		release: '1484582400',

		wowheadBonuses: {
			[DIFFICULTIES.NORMAL]: '0',
			[DIFFICULTIES.HEROIC]: '3444',
			[DIFFICULTIES.MYTHIC]: '3445'
		},

		bosses: [
			{
				wowId: '102263',
				name: 'Skorpyron'
			},

			{
				wowId: '104415',
				name: 'Chronomatic Anomaly'
			},

			{
				wowId: '104288',
				name: 'Trilliax'
			},


			{
				wowId: '107699',
				name: 'Spellblade Aluriel'
			},

			{
				wowId: '104528',
				name: 'High Botanist Tel\'arn'
			},

			{
				wowId: '103758',
				name: 'Star Augur Etraeus'
			},


			{
				wowId: '103685',
				name: 'Tichondrius'
			},

			{
				wowId: '101002',
				name: 'Krosus'
			},

			{
				wowId: '110965',
				name: 'Elisande'
			},


			{
				wowId: '105503',
				name: 'Gul\'dan'
			}
		]
	},

	{
		id: newId('instance'),

		wowId: '8440',
		name: 'Trial of Valor',
		release: '1477324800',

		wowheadBonuses: {
			[DIFFICULTIES.NORMAL]: '0',
			[DIFFICULTIES.HEROIC]: '3468',
			[DIFFICULTIES.MYTHIC]: '3469'
		},

		bosses: [
			{
				wowId: '95676',
				name: 'Odyn'
			},

			{
				wowId: '114344',
				name: 'Guarm'
			},

			{
				wowId: '114537',
				name: 'Helya'
			}
		]
	},

	{
		id: newId('instance'),

		wowId: '8026',
		name: 'The Emerald Nightmare',
		release: '1474300800',

		wowheadBonuses: {
			[DIFFICULTIES.NORMAL]: '0',
			[DIFFICULTIES.HEROIC]: '1805',
			[DIFFICULTIES.MYTHIC]: '1806'
		},

		bosses: [
			{
				wowId: '103160',
				name: 'Nythendra'
			},

			{
				wowId: '105393',
				name: 'Il\'gynoth, Heart of Corruption'
			},

			{
				wowId: '106087',
				name: 'Elerethe Renferal'
			},

			{
				wowId: '100497',
				name: 'Ursoc'
			},

			{
				wowId: '39407',
				name: 'Dragons of Nightmare'
			},

			{
				wowId: '113534',
				name: 'Cenarius'
			},

			{
				wowId: '102206',
				name: 'Xavius'
			}
		]
	}
];

export const items = [
	{
		id: newId('item'),

		wowId: '140793',
		name: 'Perfectly Preserved Cake',
		sourceId: '104288',
		slot: 'trinket',

		allowed: {
			[ROLES.MELEE]: [],
			[ROLES.RANGED]: [],
			[ROLES.HEALERS]: [
				CLASSES.PALADIN,
				CLASSES.SHAMAN,
				CLASSES.DRUID,
				CLASSES.MONK,
				CLASSES.PRIEST
			],
			[ROLES.TANKS]: [
				CLASSES.DEATH_KNIGHT,
				CLASSES.PALADIN,
				CLASSES.WARRIOR,
				CLASSES.DEMON_HUNTER,
				CLASSES.DRUID,
				CLASSES.MONK
			]
		}
	}
];

export const buttons = [
	{
		id: newId('button'),

		name: 'Intellect',
		order: 1,

		select: {
			[ROLES.MELEE]: [],
			[ROLES.RANGED]: [
				CLASSES.SHAMAN,
				CLASSES.DRUID,
				CLASSES.PRIEST,
				CLASSES.MAGE,
				CLASSES.WARLOCK
			],
			[ROLES.HEALERS]: [
				CLASSES.PALADIN,
				CLASSES.SHAMAN,
				CLASSES.DRUID,
				CLASSES.MONK,
				CLASSES.PRIEST
			],
			[ROLES.TANKS]: []
		}
	},

	{
		id: newId('button'),

		name: 'Strength',
		order: 1,

		select: {
			[ROLES.MELEE]: [
				CLASSES.DEATH_KNIGHT,
				CLASSES.PALADIN,
				CLASSES.WARRIOR
			],
			[ROLES.RANGED]: [],
			[ROLES.HEALERS]: [],
			[ROLES.TANKS]: [
				CLASSES.DEATH_KNIGHT,
				CLASSES.PALADIN,
				CLASSES.WARRIOR
			]
		}
	},

	{
		id: newId('button'),

		name: 'Agility',
		order: 1,

		select: {
			[ROLES.MELEE]: [
				CLASSES.SHAMAN,
				CLASSES.DEMON_HUNTER,
				CLASSES.DRUID,
				CLASSES.MONK,
				CLASSES.ROGUE
			],
			[ROLES.RANGED]: [
				CLASSES.HUNTER
			],
			[ROLES.HEALERS]: [],
			[ROLES.TANKS]: [
				CLASSES.DEMON_HUNTER,
				CLASSES.DRUID,
				CLASSES.MONK
			]
		}
	}
];

window.buttons = buttons;
window.instances = instances;
window.items = items;

// select: {
// 	[ROLES.MELEE]: [

// 	],
// 	[ROLES.RANGED]: [

// 	],
// 	[ROLES.HEALERS]: [

// 	],
// 	[ROLES.TANKS]: [

// 	]
// }
