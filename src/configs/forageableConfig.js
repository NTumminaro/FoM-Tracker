
const forageableConfig = {
  name: 'Forageable',
  defaultSize: {
		width: '35%',
		height: '30%',
  },
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'beach', label: 'Beach' },
				{ type: 'narrows', label: 'Narrows' },
				{ type: 'eastern road', label: 'Eastern Road' },
        { type: 'sweetwater farm', label: 'Sweetwater Farm' },
        { type: 'western ruins', label: 'Western Ruins' },
				{ type: 'mine', label: 'Mine' },
			],
		},
		seasons: {
			title: 'Seasons',
			filters: ['Spring', 'Summer', 'Fall', 'Winter'],
		},
		attributes: {
			title: 'Attributes',
			filters: [
				{ type: 'museum', label: 'Museum' },
			],
		},
	},
	sortOptions: [
		// { type: 'name', label: 'Name' },
	],
  tooltipFields: [
		'location',
		'season',
	],
};

export default forageableConfig;