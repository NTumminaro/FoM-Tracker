const fishConfig = {
	name: 'Fish',
	defaultSize: {
		width: 47,
		height: 30,
	},
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'pond', label: 'Pond' },
				{ type: 'river', label: 'River' },
				{ type: 'ocean', label: 'Ocean' },
				{ type: 'mine', label: 'Mine' },
			],
		},
		seasons: {
			title: 'Seasons',
			filters: ['Spring', 'Summer', 'Fall', 'Winter'],
		},
		weathers: {
			title: 'Weather',
			filters: ['Sunny', 'Rain', 'Storm', 'Snow', 'Blizzard'],
		},
		attributes: {
			title: 'Attributes',
			filters: [
				{ type: 'museum', label: 'Museum' },
				{ type: 'diveable', label: 'Diveable' },
				{ type: 'skill', label: 'Skill' },
			],
		},
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'size', label: 'Size' },
		{ type: 'rarity', label: 'Rarity' },
	],
	tooltipFields: [
		'location',
		'size',
		'rarity',
		'requiredPerk',
		'skill',
		'essence',
		'season',
		'weather',
		'museumAndDiveable',
	],
};

export default fishConfig;
