
const forageableConfig = {
  name: 'Forageable',
  defaultSize: {
    width: 1000,
    height: 350,
  },
  filters: {
    seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
    locations: ['The Narrows', 'The Eastern Road', 'Sweetwater Farms', 'The Western Ruins', 'Overworld', 'Mines' ],
    Museum: ['Yes', 'No'],
  },
  tooltipFields: [
		'location',
		'season',
	],
};

export default forageableConfig;