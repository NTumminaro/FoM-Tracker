const fishConfig = {
	name: 'Fish',
	defaultSize: {
		width: 1250,
		height: 350,
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
	tooltipFields: [
		'location',
		'size',
		'requiredPerk',
		'skill',
		'essence',
		'season',
		'weather',
		'museumAndDiveable',
	],
};

export default fishConfig;
