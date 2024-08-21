// Libraries & Frameworks /////////////////////////////////////////////////
import { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	Typography,
	IconButton,
	Tooltip,
	Stack,
	Menu,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Resizable } from 're-resizable';

// Components, Hooks, & Utils /////////////////////////////////////////////////
import FilterButtons from './components/FilterButtons';
import cookedDishesData from '../../data/cookedDish.json';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function CookedDishTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
}) {
	// State Hooks ////////////////////////////////////////////////////
	const [cookedDishes, setCookedDishes] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('cookedDishTrackerContainerSize')) || {
			width: 1130,
			height: 350,
		}
	);
	const [filters, setFilters] = useState({
		seasons: [],
		weathers: [],
		locations: [],
		showSkills: false,
		showDiveable: false,
		showMissing: false,
	});
	const [anchorEl, setAnchorEl] = useState(null);

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
			localStorage.getItem('cookedDishTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}
		const savedCaughtCookedDishes =
			JSON.parse(localStorage.getItem('caughtCookedDishes')) || {};
		let filteredCookedDishes = cookedDishesData.filter(
			(f) => f.Ignore !== 'Yes'
		);
		if (museumOnly) {
			filteredCookedDishes = filteredCookedDishes.filter(
				(f) => f.Museum === 'Yes'
			);
		}
		const updatedCookedDishes = filteredCookedDishes.map((f) => {
			const lowerCaseCookedDishes = keysToLowerCase(f);
			return {
				...lowerCaseCookedDishes,
				caught: !!savedCaughtCookedDishes[lowerCaseCookedDishes.name],
			};
		});
		setCookedDishes(updatedCookedDishes);
	}, [museumOnly]);

	// Handlers ////////////////////////////////////////////////////
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

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

	const filterCookedDishes = () => {
		return cookedDishes.filter((f) => {
			const matchesSeason =
				filters.seasons.length === 0 ||
				f.season.some((season) => filters.seasons.includes(season)) ||
				f.season.includes('All');
			const matchesWeather =
				filters.weathers.length === 0 ||
				f.weather.some((weather) => filters.weathers.includes(weather)) ||
				f.weather.includes('Any');
			const matchesLocation =
				filters.locations.length === 0 ||
				filters.locations.includes(f.source.toLowerCase()) ||
				(filters.locations.includes('mine') &&
					f.source.toLowerCase().includes('mine')) ||
				f.source.toLowerCase().includes('floor');
			const matchesMuseum =
				!filters.showMuseum || f.museum.toLowerCase() === 'yes';
			const matchesSkills = !filters.showSkills || f.skill;
			const matchesDiveable =
				!filters.showDiveable || f.diveable.toLowerCase() === 'yes';
			const matchesMissing = !filters.showMissing || !f.caught;

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

	const countCaughtCookedDishes = () =>
		cookedDishes.filter((f) => f.caught).length;

	const toggleCaught = (cookedDishName) => {
		const updatedCookedDishes = cookedDishes.map((f) =>
			f.name === cookedDishName ? { ...f, caught: !f.caught } : f
		);
		setCookedDishes(updatedCookedDishes);

		const savedCaughtCookedDishes =
			JSON.parse(localStorage.getItem('caughtCookedDishes')) || {};
		savedCaughtCookedDishes[cookedDishName] =
			!savedCaughtCookedDishes[cookedDishName];
		localStorage.setItem(
			'caughtCookedDishes',
			JSON.stringify(savedCaughtCookedDishes)
		);
	};

	const getSkillIcon = (level) => (
		<>
			<img
				height={16}
				width={16}
				src="misc/cooking.webp"
				alt="cooking"
				key="cooking"
			/>
			<Typography marginLeft={1}>Level: {level}</Typography>
		</>
	);

	const getKitchenTierIcon = (tier) => (
		<>
			<img
				height={16}
				width={16}
				src={`cookedDish/kitchen_level_${tier}.webp`}
				alt="tier"
				key="tier"
			/>
			<Typography marginLeft={1}>Kitchen Tier: {tier}</Typography>
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
						src={`cookedDish/${ingredientName.replace(/ /g, '_').toLowerCase()}.webp`}
						alt={ingredientName}
						style={{ width: '30px', height: '30px' }}
					/>
					<Typography marginLeft={0}>{ingredient}</Typography>
				</Box>
			);
		});
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
					'cookedDishTrackerContainerSize',
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
						title="Toggle Filters"
						arrow
						disableInteractive
					>
						<IconButton
							sx={{ marginRight: '2px' }}
							size="small"
							color={'warning'}
							onClick={handleMenuOpen}
						>
							<FilterAltIcon />
						</IconButton>
					</Tooltip>
					<Typography variant="subtitle1">
						Cooked Dish Tracker ({countCaughtCookedDishes()} /{' '}
						{cookedDishes.length})
					</Typography>
				</Box>

				{/* Filters Menu */}
				<Menu
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'left',
					}}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<FilterButtons
						filters={filters}
						tooltipsEnabled={tooltipsEnabled}
						toggleFilter={toggleFilter}
						isVerticalLayout={false}
						setFilters={setFilters}
					/>
				</Menu>

				<Box sx={{ display: 'flex', height: 'auto' }}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						flexWrap={'wrap'}
						alignContent={'start'}
					>
						{filterCookedDishes().map((f) => (
							<Tooltip
								disableHoverListener={!tooltipsEnabled}
								key={f.name}
								componentsProps={{ tooltip: { sx: { maxWidth: 'unset' } } }}
								title={
									<Stack spacing={1} minWidth={'200px'} width={'360px'}>
										<Typography
											sx={{ borderBottom: 'solid 1px white' }}
											pl={0.5}
											variant="h6"
										>
											{f.name}
										</Typography>
										{f.source && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Source
													</Typography>
													<Typography marginLeft={2}>{f.source}</Typography>
												</Box>
											</Paper>
										)}
										{f.time && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Time
													</Typography>
													<Typography marginLeft={2}>{f.time}</Typography>
												</Box>
											</Paper>
										)}
										{f.ingredients && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Ingredients
													</Typography>
													<Box
														display="block"
														alignItems="start"
														flexWrap="wrap"
													>
														{getIngredients(f.ingredients)}
													</Box>
												</Box>
											</Paper>
										)}
										{f.requiredperk && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Required Perk
													</Typography>
													<Typography marginLeft={2}>
														{f.requiredperk}
													</Typography>
												</Box>
											</Paper>
										)}
										{f.level && (
											<Box display="flex" alignItems="center">
												{getSkillIcon(f.level)}
											</Box>
										)}
										{f.kitchen && (
											<Box display="flex" alignItems="center">
												{getKitchenTierIcon(f.kitchen)}
											</Box>
										)}
										<Box display="flex" alignItems="center">
											{f.museum === 'Yes' && (
												<img
													height={24}
													width={24}
													src="misc/museum.webp"
													alt="museum"
												/>
											)}
										</Box>
									</Stack>
								}
								arrow
								disableInteractive
							>
								<IconButton
									size="small"
									onClick={() => toggleCaught(f.name)}
									sx={{
										filter: f.caught ? 'grayscale(0)' : 'grayscale(1)',
									}}
								>
									<img
										src={`cookedDish/${f.name
											.replace(/ /g, '_')
											.toLowerCase()}.webp`}
										alt={f.name}
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

export default CookedDishTracker;

CookedDishTracker.propTypes = {
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
};
