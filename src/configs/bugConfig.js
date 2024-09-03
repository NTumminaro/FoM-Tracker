
const bugConfig = {
  name: 'Bug',
  defaultSize: {
		width: 47,
		height: 30,
  },
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'beach', label: 'Beach' },
				{ type: 'narrows', label: 'Narrows' },
				{ type: 'eastern road', label: 'Eastern Road' },
        {type: 'overworld', label: 'Overworld'},
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
			],
		},
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'daycycle', label: 'Time of Day' },
		{ type: 'rarity', label: 'Rarity' },
	],
  tooltipFields: [
		'location',
    'time',
    'spawn',
		'rarity',
		'season',
		'weather',
    'museumAndDiveable',
	],
};

export default bugConfig;