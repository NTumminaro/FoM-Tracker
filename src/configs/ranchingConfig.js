const materialConfig = {
	name: 'Ranching',
	defaultSize: {
		width: '30%',
		height: '20%',
	},
	filterGroups: {
		buildings: {
			title: 'Buildings',
			filters: [
				{ type: 'coop', label: 'Coop' },
        { type: 'barn', label: 'Barn' }, 
			],
		},
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'hearts', label: 'Hearts' },
	],
	tooltipFields: ['source', 'hearts', 'building'],
};

export default materialConfig;
