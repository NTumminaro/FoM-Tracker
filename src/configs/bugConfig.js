
const bugConfig = {
  name: 'Bug',
  defaultSize: {
    width: 750,
    height: 350,
  },
  filters: {
    seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
    locations: ['The Narrows', 'The Eastern Road', 'Sweetwater Farms', 'The Western Ruins', 'Overworld', 'Mines' ],
    Museum: ['Yes', 'No'],
  },
  tooltipFields: [
		'location',
    'time',
    'spawn',
		'season',
		'weather',
    'museumAndDiveable',
	],
};

export default bugConfig;