const materialConfig = {
	name: 'Ranching',
	defaultSize: {
		width: 400,
		height: 350,
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
	tooltipFields: ['source', 'hearts', 'building'],
};

export default materialConfig;
