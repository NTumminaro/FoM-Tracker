const materialConfig = {
	name: 'Material',
	defaultSize: {
		width: '22%',
		height: '30%',
	},
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'mine', label: 'Mine' },
			],
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
	tooltipFields: ['source', 'museumAndDiveable'],
};

export default materialConfig;
