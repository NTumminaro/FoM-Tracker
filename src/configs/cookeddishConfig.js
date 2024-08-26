const cookedDishConfig = {
	name: 'CookedDish',
	defaultSize: {
		width: 1500,
		height: 350,
	},
	filterGroups: {
		kitchen: {
			title: 'Kitchen',
			filters: [
				{ type: '1', label: 'Level 1' },
				{ type: '2', label: 'Level 2' },
				{ type: '3', label: 'Level 3' },
			],
		},
		// attributes: {
		// 	title: 'Attributes',
		// 	filters: [
		// 		{ type: 'museum', label: 'Museum' },
		// 		{ type: 'diveable', label: 'Diveable' },
		// 	],
		// },
	},
	tooltipFields: ['source', 'time', 'ingredients', 'skill', 'kitchen'],
};

export default cookedDishConfig;
