// Libraries & Frameworks /////////////////////////////////////////////////
import { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	Typography,
	IconButton,
	Tooltip,
	Stack,
	Collapse,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Resizable } from 're-resizable';

// Components, Hooks, & Utils /////////////////////////////////////////////////
import FilterButtons from './components/FilterButtons';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function ItemTracker({
	config,
	data,
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
	showUnobtainable,
}) {
	console.log(data);
	// State Hooks ////////////////////////////////////////////////////
	const [items, setItems] = useState([]);
	const [selectedSort, setSelectedSort] = useState('name');
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem(`${config.name}ContainerSize`)) ||
			config.defaultSize
	);
	const [filters, setFilters] = useState({
		seasons: [],
		weathers: [],
		locations: [],
		kitchen: [],
		buildings: [],
		materials: [],
		attributes: [],
		showMissing: false,
	});

	const [expanded, setExpanded] = useState(true);

	// Utils ////////////////////////////////////////////////////
	const keysToLowerCase = (obj) => {
		return Object.keys(obj).reduce((acc, key) => {
			acc[key.toLowerCase()] = obj[key];
			return acc;
		}, {});
	};

	// Effect Hooks ////////////////////////////////////////////////////
	useEffect(() => {
		const savedContainerSize = JSON.parse(
			localStorage.getItem(`${config.name}ContainerSize`)
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}
		const savedItems =
			JSON.parse(localStorage.getItem(`caught${config.name}`)) || {};
		let filteredItems = data;
		if (!showUnobtainable) {
			filteredItems = filteredItems.filter((i) => i.Ignore !== 'Yes');
		}
		if (museumOnly) {
			filteredItems = filteredItems.filter((i) => i.Museum === 'Yes');
		}

		const updatedItems = filteredItems.map((f) => {
			const lowerCaseItems = keysToLowerCase(f);
			return {
				...lowerCaseItems,
				caught: !!savedItems[lowerCaseItems.name],
			};
		});
		setItems(updatedItems);
	}, [museumOnly]);

	// Handlers ////////////////////////////////////////////////////
	const toggleFilter = (filterType, value) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };

			if (
				[
					'seasons',
					'weathers',
					'locations',
					'materials',
					'kitchen',
					'buildings',
					'attributes',
				].includes(filterType)
			) {
				// Handle array filters
				if (updatedFilters[filterType].includes(value)) {
					updatedFilters[filterType] = updatedFilters[filterType].filter(
						(item) => item !== value
					);
				} else {
					updatedFilters[filterType] = [...updatedFilters[filterType], value];
				}
			} else {
				// Handle boolean filters
				updatedFilters[filterType] = !prevFilters[filterType];
			}

			return updatedFilters;
		});
	};

	const filterItems = () => {
		const sizeOrder = ['Small', 'Medium', 'Large', 'Giant'];
		const rarityOrder = [
			'Ultra Common',
			'Very Common',
			'Common',
			'Uncommon',
			'Kinda Rare',
			'Rare',
			'Very Rare',
			'Legendary',
		];
		const dayCycle = ['Morning', 'Day', 'Night', 'All day'];

		const convertTimeToMinutes = (timeString) => {
			const [time, unit] = timeString.split(' ');

			if (unit === 'min') {
				return parseInt(time, 10);
			} else if (unit === 'hour') {
				return parseInt(time, 10) * 60;
			}
			return 0;
		};

		const sortedItems = [...items].sort((a, b) => {
			switch (selectedSort) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'size':
					return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
				case 'rarity':
					return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
				case 'daycycle':
					return dayCycle.indexOf(a.time) - dayCycle.indexOf(b.time);
				case 'time': {
					const timeA = convertTimeToMinutes(a.time);
					const timeB = convertTimeToMinutes(b.time);
					return timeA - timeB;
				}
				case 'level': {
					const levelA = parseInt(a.requiredlevel, 10);
					const levelB = parseInt(b.requiredlevel, 10);
					return levelA - levelB;
				}
				case 'hearts': {
					const heartsA = parseInt(a.hearts, 10);
					const heartsB = parseInt(b.hearts, 10);
					return heartsA - heartsB;
				}
				case 'growth': {
					const growthA = parseInt(a.growth.split(' ')[0], 10);
					const growthb = parseInt(b.growth.split(' ')[0], 10);
					return growthA - growthb;
				}
				default:
					return 0;
			}
		});
		return sortedItems.filter((i) => {
			const matchesSeason =
				filters.seasons.length === 0 ||
				(i.season &&
					i.season.some((season) => filters.seasons.includes(season))) ||
				(i.season && i.season.includes('All'));

			const matchesWeather =
				filters.weathers.length === 0 ||
				(i.weather &&
					i.weather.some((weather) => filters.weathers.includes(weather))) ||
				(i.weather && i.weather.includes('Any'));

			const matchesLocation =
				filters.locations.length === 0 ||
				(i.location &&
					i.location
						.split(',')
						.map((loc) => loc.trim().toLowerCase())
						.some((loc) => filters.locations.includes(loc))) ||
				(i.location &&
					i.location.toLowerCase().includes('overworld') &&
					!filters.locations.includes('mine')) ||
				(i.location &&
					filters.locations.includes('mine') &&
					i.location.toLowerCase().includes('mine' || 'floor')) ||
				(!i.location && filters.locations.includes('anywhere')) ||
				(i.othersources &&
					i.othersources
						.map((source) => source?.Location?.trim().toLowerCase())
						.some((source) => filters.locations.includes(source)));

			const matchKitchen =
				filters.kitchen.length === 0 ||
				(i.kitchen && filters.kitchen.includes(i.kitchen));

			console.log(i.building);

			const matchBuildings =
				filters.buildings.length === 0 ||
				(i.building && filters.buildings.includes(i.building.toLowerCase()));

			const matchMaterials =
				filters.materials.length === 0 ||
				(i.ingredients &&
					i.ingredients
						.map((mat) => mat.split(' ')[0].toLowerCase())
						.some((mat) =>
							filters.materials
								.map((mat) => mat.split('_')[0].toLowerCase())
								.includes(mat)
						));

			const matchesAttributes =
				filters.attributes.length === 0 ||
				filters.attributes.some((attr) => {
					if (attr === 'skill') return i.skill;
					return i[attr] && i[attr].toLowerCase() === 'yes';
				});

			const matchesMissing = !filters.showMissing || !i.caught;

			return (
				matchesSeason &&
				matchesWeather &&
				matchesLocation &&
				matchKitchen &&
				matchMaterials &&
				matchBuildings &&
				matchesAttributes &&
				matchesMissing
			);
		});
	};

	const countCaughtItems = () => items.filter((i) => i.caught).length;

	const toggleCaught = (itemName) => {
		const updatedItems = items.map((i) =>
			i.name === itemName ? { ...i, caught: !i.caught } : i
		);
		setItems(updatedItems);

		const savedCaughtItems =
			JSON.parse(localStorage.getItem(`caught${config.name}`)) || {};
		savedCaughtItems[itemName] = !savedCaughtItems[itemName];
		localStorage.setItem(
			`caught${config.name}`,
			JSON.stringify(savedCaughtItems)
		);
	};

	const handleSeasonIcons = (seasons) => {
		return seasons.map((season) => {
			switch (season.toLowerCase()) {
				case 'spring':
					return <img src="misc/spring.webp" alt="spring" key="spring" />;
				case 'summer':
					return <img src="misc/summer.webp" alt="summer" key="summer" />;
				case 'fall':
					return <img src="misc/fall.webp" alt="fall" key="fall" />;
				case 'winter':
					return <img src="misc/winter.webp" alt="winter" key="winter" />;
				default:
					return null;
			}
		});
	};

	const handleWeatherIcons = (weather) => {
		return weather.map((condition) => {
			switch (condition.toLowerCase()) {
				case 'sunny':
					return (
						<img
							height={24}
							width={24}
							src="weather/sunny.webp"
							alt="sunny"
							key="sunny"
						/>
					);
				case 'rain':
					return (
						<img
							height={24}
							width={24}
							src="weather/rain.webp"
							alt="rain"
							key="rain"
						/>
					);
				case 'rainy':
					return (
						<img
							height={24}
							width={24}
							src="weather/rainy.webp"
							alt="rainy"
							key="rainy"
						/>
					);
				case 'storm':
					return (
						<img
							height={24}
							width={24}
							src="weather/storm.webp"
							alt="storm"
							key="storm"
						/>
					);
				case 'thunderstorm':
					return (
						<img
							height={24}
							width={24}
							src="weather/thunderstorm.webp"
							alt="thunderstorm"
							key="thunderstorm"
						/>
					);
				case 'snow':
					return (
						<img
							height={24}
							width={24}
							src="weather/snow.webp"
							alt="snow"
							key="snow"
						/>
					);
				case 'blizzard':
					return (
						<img
							height={24}
							width={24}
							src="weather/blizzard.webp"
							alt="blizzard"
							key="blizzard"
						/>
					);
				case 'petals':
					return (
						<img
							height={24}
							width={24}
							src="weather/petals.webp"
							alt="petals"
							key="petals"
						/>
					);
				case 'leaves':
					return (
						<img
							height={24}
							width={24}
							src="weather/leaves.webp"
							alt="leaves"
							key="leaves"
						/>
					);
				default:
					return null;
			}
		});
	};

	const getTimeRange = (time) => {
		if (time === 'Day') {
			return '(6 AM - 8 PM)';
		} else if (time === 'Morning') {
			return '(6 AM - 12 PM)';
		} else if (time === 'Night') {
			return '(8 PM - 2 AM)';
		} else if (time === 'All Day') {
			return null;
		}
	};

	const getSkillIcon = (skill, level) => (
		<>
			<Box
				display={'flex'}
				alignContent={'center'}
				justifyContent={'center'}
				height={'24px'}
				width={'24px'}
			>
				<img
					style={{
						objectFit: 'contain',
						maxWidth: '100%',
						maxHeight: '100%',
					}}
					src={`misc/${skill.toLowerCase()}.webp`}
					alt={skill}
					key={skill}
				/>
			</Box>
			<Typography marginLeft={1}>Level: {level}</Typography>
		</>
	);

	const getIngredients = (ingredients) => {
		return ingredients.map((ingredient) => {
			let ingredientName = ingredient.split('(')[0].trim().toLowerCase();
			console.log(ingredientName);
			let futureIngredients = [
				'lava chestnut',
				'spell fruit',
				'flame pepper',
				'ash mushroom',
				'hot potato',
			];

			const getImgSrc = (ingredientName) => {
				if (futureIngredients.includes(ingredientName)) {
					return 'misc/question.webp';
				} else {
					return `${config.name.toLowerCase()}/${ingredientName.replace(/ /g, '_').toLowerCase()}.webp`;
				}
			};
			return (
				<Box
					key={ingredient}
					display="flex"
					alignItems="center"
					marginBottom={1}
				>
					<img
						src={getImgSrc(ingredientName)}
						alt={ingredientName}
						style={{ width: '30px', height: '30px' }}
					/>
					<Typography marginLeft={0}>{ingredient}</Typography>
				</Box>
			);
		});
	};

	const getOtherSources = (name, sources) => {
		return sources.map((source) => {
			console.log(source);
			let imgSrc = '';
			switch (source.Type) {
				case 'Crop':
					imgSrc = `crop/${name.replace(/ /g, '_').toLowerCase()}.webp`;
					break;
				case 'Seed':
					imgSrc = `crop/${name.replace(/ /g, '_').toLowerCase()}_seed.webp`;
					break;
				default:
					imgSrc = 'misc/question.webp';
			}

			return (
				<Box
					key={source.Location}
					display="flex"
					alignItems="center"
					marginBottom={1}
				>
					<img
						src={imgSrc}
						alt={name}
						style={{ width: '30px', height: '30px' }}
					/>
					<Typography marginLeft={'2px'}>
						{source.Location} {source.Details ? `- ${source.Details}` : null}{' '}
					</Typography>
				</Box>
			);
		});
	};

	const getKitchenTierIcon = (tier) => (
		<>
			<Box
				display={'flex'}
				alignContent={'center'}
				justifyContent={'center'}
				height={'24px'}
				width={'24px'}
			>
				<img
					style={{
						objectFit: 'contain',
						maxWidth: '100%',
						maxHeight: '100%',
					}}
					src={`cookeddish/kitchen_level_${tier}.webp`}
					alt="tier"
					key="tier"
				/>
			</Box>
			<Typography marginLeft={1}>Kitchen Tier: {tier}</Typography>
		</>
	);

	const getEssenceIcon = (essence) => {
		return (
			<>
				<img
					height={26}
					width={26}
					src="misc/essence.webp"
					alt="essence"
					key="essence"
				/>
				<Typography marginLeft={1}>Cost: {essence}</Typography>
			</>
		);
	};

	const getBuildingIcon = (building) => {
		return (
			<>
				<img
					height={28}
					width={28}
					src={`ranching/${building.toLowerCase()}.webp`}
					alt="heart"
					key="heart"
				/>
				<Typography marginLeft={1}>{building}</Typography>
			</>
		);
	};

	const getHeartIcon = (hearts) => {
		return (
			<>
				<img
					height={26}
					width={26}
					src="ranching/heart2.webp"
					alt="heart"
					key="heart"
				/>
				<Typography marginLeft={1}>Hearts: {hearts}</Typography>
			</>
		);
	};

	const getImgSrc = (i) => {
		if (i.nosprite === true) {
			return 'misc/question.webp';
		} else {
			return `${config.name.toLowerCase()}/${i.name.replace(/ /g, '_').toLowerCase()}.webp`;
		}
	};

	// Child Components ////////////////////////////////////////////////////
	const renderTooltipContent = (item) => {
		return (
			<Stack
				spacing={1}
				marginBottom={'6px'}
				minWidth={'200px'}
				width={'360px'}
				key={item.name}
			>
				<Typography
					sx={{ borderBottom: 'solid 1px white' }}
					pl={0.5}
					variant="h6"
				>
					{item.name}
				</Typography>
				{config.tooltipFields.map((field) => {
					switch (field) {
						case 'time':
							return (
								<>
									{item.time !== '' && (
										<Paper key={field}>
											<Typography variant="caption" marginLeft={1}>
												{field.charAt(0).toUpperCase() + field.slice(1)}
											</Typography>
											<Typography marginLeft={2}>
												{item.time} {getTimeRange(item[field])}
											</Typography>
										</Paper>
									)}
								</>
							);
						case 'season':
							return (
								<>
									{item.season[0] !== 'All' ? (
										<Box display="flex" key={field}>
											{handleSeasonIcons(item[field])}
										</Box>
									) : null}
								</>
							);
						case 'weather':
							return (
								<>
									{item.weather[0] !== 'Any' ? (
										<Box display="flex" key={field}>
											{handleWeatherIcons(item[field])}
										</Box>
									) : null}
								</>
							);
						case 'requiredPerk':
							return (
								<>
									{item.requiredperk && item.requiredperk !== '' && (
										<Paper key={field}>
											<Typography variant="caption" marginLeft={1}>
												Required Skill
											</Typography>
											<Typography marginLeft={2}>
												{item.requiredperk}
											</Typography>
										</Paper>
									)}
								</>
							);
						case 'ingredients':
							return (
								<>
									{item.ingredients && item.ingredients !== '' && (
										<Paper key={field}>
											<Typography variant="caption" marginLeft={1}>
												{field.charAt(0).toUpperCase() + field.slice(1)}
											</Typography>
											{getIngredients(item.ingredients)}
										</Paper>
									)}
								</>
							);
						case 'skill':
							return (
								<>
									{item.skill && item.skill !== '' && (
										<Box display="flex" alignItems="center">
											{getSkillIcon(item.skill, item.requiredlevel)}
										</Box>
									)}
								</>
							);
						case 'essence':
							return (
								<>
									{item.essence && item.essence !== '' && (
										<Box display="flex" alignItems="center">
											{getEssenceIcon(item[field])}
										</Box>
									)}
								</>
							);
						case 'kitchen':
							return (
								<>
									{item.kitchen && item.kitchen !== '' && (
										<Box display="flex" alignItems="center">
											{getKitchenTierIcon(item.kitchen)}
										</Box>
									)}
								</>
							);
						case 'building':
							return (
								<>
									{item.building && item.building !== '' && (
										<Box display="flex" alignItems="center">
											{getBuildingIcon(item.building)}
										</Box>
									)}
								</>
							);
						case 'hearts':
							return (
								<>
									{item.hearts && item.hearts !== '' && (
										<Box display="flex" alignItems="center">
											{getHeartIcon(item.hearts)}
										</Box>
									)}
								</>
							);
						case 'museumAndDiveable':
							return (
								<>
									{item.museum === 'Yes' || item.diveable === 'Yes' ? (
										<Box display="flex">
											{item.museum === 'Yes' && (
												<img
													height={24}
													width={24}
													src="misc/museum.webp"
													alt="museum"
												/>
											)}
											{item.diveable === 'Yes' && (
												<img
													height={24}
													width={24}
													src="misc/diveable.png"
													alt="diveable"
													style={{
														filter:
															'sepia(1) hue-rotate(190deg) saturate(600%)',
														marginLeft: item.museum === 'Yes' ? 8 : 0,
													}}
												/>
											)}
										</Box>
									) : null}
								</>
							);
						case 'othersources':
							return (
								<>
									{item.othersources && item.othersources !== '' && (
										<Paper key={field}>
											<Typography variant="caption" marginLeft={1}>
												Other Sources
											</Typography>
											{getOtherSources(item.name, item.othersources)}
										</Paper>
									)}
								</>
							);
						default:
							return (
								<>
									{item[field] && item[field] !== '' && (
										<Paper key={field}>
											<Box>
												<Typography variant="caption" marginLeft={1}>
													{field.charAt(0).toUpperCase() + field.slice(1)}
												</Typography>
												<Typography marginLeft={2}>{item[field]}</Typography>
											</Box>
										</Paper>
									)}
								</>
							);
					}
				})}
			</Stack>
		);
	};

	// Render ////////////////////////////////////////////////////
	return (
		<Resizable
			enable={
				editMode
					? {
							top: false,
							right: false,
							bottom: false,
							left: false,
							topRight: false,
							bottomRight: true,
							bottomLeft: false,
							topLeft: false,
						}
					: {}
			}
			style={{ margin: '10px', position: 'relative' }}
			defaultSize={{ width: containerSize.width, height: containerSize.height }}
			maxWidth="95vw"
			onResizeStop={(e, direction, ref, d) => {
				let newContainerSize = {
					width: containerSize.width + d.width,
					height: containerSize.height + d.height,
				};
				setContainerSize(newContainerSize);
				localStorage.setItem(
					`${config.name}ContainerSize`,
					JSON.stringify(newContainerSize)
				);
			}}
			handleComponent={{
				bottomRight: <ResizeHandle />,
			}}
		>
			<Box
				overflow={'auto'}
				sx={{ height: '100%', border: 'solid 3px #3a49b2', backgroundColor }}
			>
				<Box
					display={'flex'}
					justifyContent={'start'}
					alignItems={'center'}
					zIndex={100}
					sx={{
						height: 'auto',
						backgroundColor: 'secondary.main',
					}}
				>
					<Tooltip
						placement="top"
						title={expanded ? 'Hide Filters' : 'Show Filters'}
						arrow
						disableInteractive
					>
						<IconButton
							sx={{ marginRight: '2px' }}
							size="small"
							// onClick={handleMenuOpen}
							onClick={() => setExpanded(!expanded)}
						>
							<FilterAltIcon
								sx={{ color: expanded ? 'warning.main' : 'sideBarTextColor' }}
							/>
						</IconButton>
					</Tooltip>
					<Typography variant="subtitle1">
						{config.name} Tracker ({countCaughtItems()} / {items.length})
					</Typography>
				</Box>

				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<FilterButtons
						filters={filters}
						config={config}
						tooltipsEnabled={tooltipsEnabled}
						toggleFilter={toggleFilter}
						setFilters={setFilters}
						selectedSort={selectedSort}
						setSelectedSort={setSelectedSort}
					/>
				</Collapse>

				<Box sx={{ display: 'flex', height: 'auto' }}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						flexWrap={'wrap'}
						alignContent={'start'}
					>
						{filterItems().map((i) => (
							<Tooltip
								disableHoverListener={!tooltipsEnabled}
								key={i.name}
								componentsProps={{ tooltip: { sx: { maxWidth: 'unset' } } }}
								title={renderTooltipContent(i)}
								arrow
								disableInteractive
							>
								<IconButton
									size="small"
									onClick={() => toggleCaught(i.name)}
									sx={
										caughtHighlighting
											? {
													filter: i.caught ? 'grayscale(0)' : 'grayscale(1)',
													backgroundColor: i.caught ? '#66bb6a7d' : 'inherit',
													outline:
														i.ignore === 'Yes' ? 'dashed 2px white' : 'none',
													outlineOffset: '-3px',
													'&:hover': {
														backgroundColor: i.caught ? '#66bb6aaf' : '',
														outline:
															i.ignore === 'Yes' ? 'dashed 2px white' : 'none',
													},
												}
											: {
													filter: i.caught ? 'grayscale(0)' : 'grayscale(1)',
													outline:
														i.ignore === 'Yes' ? 'dashed 2px white' : 'none',
												}
									}
								>
									<img
										// src={`${config.name.toLowerCase()}/${i.name
										// 	.replace(/ /g, '_')
										// 	.toLowerCase()}.webp`}
										src={getImgSrc(i)}
										alt={i.name}
										draggable={false}
										style={{ width: '40px', height: '40px' }}
									/>
								</IconButton>
							</Tooltip>
						))}
					</Box>
				</Box>
			</Box>
		</Resizable>
	);
}

ItemTracker.propTypes = {
	config: PropTypes.object,
	data: PropTypes.array,
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
	caughtHighlighting: PropTypes.bool,
	showUnobtainable: PropTypes.bool,
};

export default ItemTracker;
