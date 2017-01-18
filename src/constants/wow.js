const _CLASSES = {};
const _CLASSES_DISPLAY = {};

function buildClasses(data) {
	data.forEach(([key, name, display]) => {
		_CLASSES[key] = name;

		// support both DISPLAY.KEY and DISPLAY[name]
		_CLASSES_DISPLAY[key] = display;
		_CLASSES_DISPLAY[name] = display;
	});
}

buildClasses([
	['DEATH_KNIGHT', 'death-knight', 'Death Knight'],
	['WARRIOR', 'warrior', 'Warrior'],
	['PALADIN', 'paladin', 'Paladin'],

	['HUNTER', 'hunter', 'Hunter'],
	['SHAMAN', 'shaman', 'Shaman'],

	['DEMON_HUNTER', 'demon-hunter', 'Demon Hunter'],
	['DRUID', 'druid', 'Druid'],
	['ROGUE', 'rogue', 'Rogue'],
	['MONK', 'monk', 'Monk'],

	['PRIEST', 'priest', 'Priest'],
	['MAGE', 'mage', 'Mage'],
	['WARLOCK', 'warlock', 'Warlock']
]);

export const CLASSES = _CLASSES;
export const CLASSES_DISPLAY = _CLASSES_DISPLAY;


export const DIFFICULTIES = {
	NORMAL: 'normal',
	HEROIC: 'heroic',
	MYTHIC: 'mythic'
};

export const ROLES = {
	MELEE: 'melee',
	RANGED: 'ranged',
	HEALERS: 'healers',
	TANKS: 'tanks'
};

export const SLOTS = {
	HEAD: 'head',
	NECK: 'neck',
	SHOULDER: 'shoulder',
	BACK: 'back',
	CHEST: 'chest',
	WRIST: 'wrist',
	HANDS: 'hands',
	WAIST: 'waist',
	LEGS: 'legs',
	FEET: 'feet',
	FINGER: 'finger',
	TRINKET: 'trinket',
	WEAPON: 'weapon',
	OFFHAND: 'offhand',
	MISC: 'misc'
};
