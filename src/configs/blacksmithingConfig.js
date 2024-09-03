
const blacksmithingConfig = {
  name: 'Blacksmithing',
	defaultSize: {
		width: 20,
		height: 30,
	},
	filterGroups: {
    materials: {
      title: 'Materials',
      filters: [
        { type: 'copper_ingot', label: 'Copper' },
        { type: 'iron_ingot', label: 'Iron' },
        { type: 'silver_ingot', label: 'Silver' },
      ],
    },
		// attributes: {
		// 	title: 'Attributes',
		// 	filters: [
		// 		{ type: 'museum', label: 'Museum' },
		// 	],
		// },
	},
  sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'time', label: 'Time' },
		{ type: 'level', label: 'Level' },
	],
  tooltipFields: [
    'time',
    'ingredients',
    'skill'
	],
};

export default blacksmithingConfig;