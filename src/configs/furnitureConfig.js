const furnitureConfig = {
	name: 'Furniture',
	defaultSize: {
		width: '96%',
		height: '26%',
	},
	filterGroups: {
		// kitchen: {
		// 	title: 'Kitchen',
		// 	filters: [
		// 		{ type: '1', label: 'Level 1' },
		// 		{ type: '2', label: 'Level 2' },
		// 		{ type: '3', label: 'Level 3' },
		// 	],
		// },
		// attributes: {
		// 	title: 'Attributes',
		// 	filters: [
		// 		{ type: 'museum', label: 'Museum' },
		// 		{ type: 'diveable', label: 'Diveable' },
		// 	],
		// },
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'time', label: 'Time' },
		{ type: 'level', label: 'Level' },
	],
	tooltipFields: ['source', 'time', 'ingredients', 'skill', 'kitchen'],
};

export default furnitureConfig;
