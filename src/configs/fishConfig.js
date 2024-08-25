const fishConfig = {
	name: 'Fish',
	defaultSize: {
		width: 1250,
		height: 350,
	},
	filters: {
		seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
		locations: [
			'The Narrows',
			'The Eastern Road',
			'Sweetwater Farms',
			'The Western Ruins',
			'Overworld',
			'Mines',
		],
		Museum: ['Yes', 'No'],
	},
  tooltipFields: [
		'location',
		'size',
		'season',
		'weather',
		'museumAndDiveable',
	],
};

export default fishConfig;
