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
	}
];

window.instances = instances;
