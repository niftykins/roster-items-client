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
			normal: '0',
			heroic: '3444',
			mythic: '3445'
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
			normal: '0',
			heroic: '3468',
			mythic: '3469'
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
			normal: '0',
			heroic: '1805',
			mythic: '1806'
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

		wowId: '124132',
		name: 'Forward Observer\'s Camouflage Cloak',
		sourceId: '95068',
		slot: 'back',

		allowed: {
			melee: [
				'shaman',
				'druid',
				'monk',
				'rogue'
			],
			ranged: [],
			healers: [],
			tanks: [
				'druid',
				'monk'
			]
		}
	}
];

window.instances = instances;
window.items = items;
