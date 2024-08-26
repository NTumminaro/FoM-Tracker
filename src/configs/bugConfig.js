
const bugConfig = {
  name: 'Bug',
  defaultSize: {
    width: 750,
    height: 350,
  },
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'beach', label: 'Beach' },
				{ type: 'narrows', label: 'Narrows' },
				{ type: 'eastern road', label: 'Eastern Road' },
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
  tooltipFields: [
		'location',
    'time',
    'spawn',
		'season',
		'weather',
    'museumAndDiveable',
	],
};

export default bugConfig;