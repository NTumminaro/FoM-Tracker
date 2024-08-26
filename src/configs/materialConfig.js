const materialConfig = {
	name: 'Material',
	defaultSize: {
		width: 400,
		height: 350,
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
	tooltipFields: ['source', 'museumAndDiveable'],
};

export default materialConfig;
