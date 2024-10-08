const artifactConfig = {
	name: 'Artifact',
	defaultSize: {
		width: 35,
		height: 30,
	},
	filterGroups: {
		locations: {
			title: 'Locations',
			filters: [
				{ type: 'beach', label: 'Beach' },
				{ type: 'narrows', label: 'Narrows' },
				{ type: 'eastern road', label: 'Eastern Road' },
				{ type: 'sweetwater farm', label: 'Sweetwater Farm' },
				{ type: 'western ruins', label: 'Western Ruins' },
				{ type: 'mine', label: 'Mine' },
			],
		},
		attributes: {
			title: 'Attributes',
			filters: [
				{ type: 'museum', label: 'Museum' },
				{ type: 'skill', label: 'Skill' },
			],
		},
	},
	sortOptions: [
		{ type: 'name', label: 'Name' },
		{ type: 'rarity', label: 'Rarity' },
	],
	tooltipFields: [
		'location',
		'rarity',
		'requiredPerk',
		'skill',
		'essence',
		'museumAndDiveable',
	],
};

export default artifactConfig;
