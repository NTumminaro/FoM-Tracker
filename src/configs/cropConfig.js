const cropConfig = {
	name: 'Crop',
	defaultSize: {
		width: 30,
		height: 30,
	},
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'narrows', label: 'Narrows' },
				{ type: 'eastern road', label: 'Eastern Road' },
				{ type: 'balor', label: 'Balor' },
				{ type: 'wooden chest', label: 'Wooden Chest' },
				{ type: 'copper chest', label: 'Copper Chest' },
				{ type: 'quest', label: 'Quest' },
			],
		},
		seasons: {
			title: 'Seasons',
			filters: ['Spring', 'Summer', 'Fall', 'Winter'],
		},
		attributes: {
			title: 'Attributes',
			filters: [{ type: 'museum', label: 'Museum' }],
		},
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'growth', label: 'Growth' },
	],
	tooltipFields: ['seeds', 'growth', 'othersources', 'season', 'museumAndDiveable'],
};

export default cropConfig;
