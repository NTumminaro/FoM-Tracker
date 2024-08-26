
const blacksmithingConfig = {
  name: 'Blacksmithing',
  defaultSize: {
    width: 750,
    height: 350,
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
  tooltipFields: [
    'time',
    'ingredients',
    'skill'
	],
};

export default blacksmithingConfig;