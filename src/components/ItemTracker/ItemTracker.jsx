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
// import forageableData from '../../data/forageable.json';
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
}) {
	console.log(data);
	// State Hooks ////////////////////////////////////////////////////
	const [items, setItems] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem(`${config.name}ContainerSize`)) ||
			config.defaultSize
	);
	const [filters, setFilters] = useState({
		seasons: [],
		weathers: [],
		locations: [],
		showSkills: false,
		showDiveable: false,
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
		console.log(data);
		let filteredItems = data.filter((i) => i.Ignore !== 'Yes');
		if (museumOnly) {
			filteredItems = filteredItems.filter((i) => i.Museum === 'Yes');
		}

		filteredItems.sort((a, b) => a.Name.localeCompare(b.Name));

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

			if (filterType === 'showMissing') {
				updatedFilters.showMissing = !prevFilters.showMissing;
			} else if (['seasons', 'weathers', 'locations'].includes(filterType)) {
				if (updatedFilters[filterType].includes(value)) {
					updatedFilters[filterType] = updatedFilters[filterType].filter(
						(item) => item !== value
					);
				} else {
					updatedFilters[filterType] = [...updatedFilters[filterType], value];
				}
			} else {
				updatedFilters[filterType] = !updatedFilters[filterType];
			}

			return updatedFilters;
		});
	};

	const filterItems = () => {
		return items.filter((i) => {
			const matchesSeason =
				filters.seasons.length === 0 ||
				i.season.some((season) => filters.seasons.includes(season)) ||
				i.season.includes('All');
			const matchesWeather =
				filters.weathers.length === 0 ||
				i.weather.some((weather) => filters.weathers.includes(weather)) ||
				i.weather.includes('Any');
			const matchesLocation =
				filters.locations.length === 0 ||
				filters.locations.includes(i.location.toLowerCase()) ||
				(i.location.toLowerCase().includes('overworld') &&
					!filters.locations.includes('mine')) ||
				(filters.locations.includes('mine') &&
					i.location.toLowerCase().includes('mine' || 'floor'));
			const matchesMuseum =
				!filters.showMuseum || i.museum.toLowerCase() === 'yes';
			const matchesSkills = !filters.showSkills || i.skill;
			const matchesDiveable =
				!filters.showDiveable || i.diveable.toLowerCase() === 'yes';
			const matchesMissing = !filters.showMissing || !i.caught;

			return (
				matchesSeason &&
				matchesWeather &&
				matchesLocation &&
				matchesMuseum &&
				matchesSkills &&
				matchesDiveable &&
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
							alt="rainy"
							key="rainy"
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
			return (
				<Box
					key={ingredient}
					display="flex"
					alignItems="center"
					marginBottom={1}
				>
					<img
						src={`${config.name.toLowerCase()}/${ingredientName.replace(/ /g, '_').toLowerCase()}.webp`}
						alt={ingredientName}
						style={{ width: '30px', height: '30px' }}
					/>
					<Typography marginLeft={0}>{ingredient}</Typography>
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
					src={`cookedDish/kitchen_level_${tier}.webp`}
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
					height={24}
					width={24}
					src="misc/essence.webp"
					alt="essence"
					key="essence"
				/>
				<Typography marginLeft={1}>Cost: {essence}</Typography>
			</>
		);
	};

	// Child Components ////////////////////////////////////////////////////
	const renderTooltipContent = (item) => {
		return (
			<Stack
				spacing={1}
				marginBottom={'6px'}
				minWidth={'200px'}
				width={'360px'}
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
											<Typography marginLeft={2}>
												{getIngredients(item.ingredients)}
											</Typography>
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
						default:
							return (
								<>
									{item[field] !== '' && (
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
						tooltipsEnabled={tooltipsEnabled}
						toggleFilter={toggleFilter}
						isVerticalLayout={false}
						setFilters={setFilters}
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
													'&:hover': {
														backgroundColor: i.caught ? '#66bb6aaf' : '',
													},
												}
											: { filter: i.caught ? 'grayscale(0)' : 'grayscale(1)' }
									}
								>
									<img
										src={`${config.name.toLowerCase()}/${i.name
											.replace(/ /g, '_')
											.toLowerCase()}.webp`}
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
};

export default ItemTracker;
