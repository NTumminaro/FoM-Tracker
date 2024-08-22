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
import blacksmithingData from '../../data/blacksmithing.json';
import FilterButtons from './components/FilterButtons';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Components //////////////////////////////////////////////////////////////
function BlacksmithingTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
}) {
	const [blacksmithings, setBlacksmithings] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('blacksmithingTrackerContainerSize')) || {
			width: 380,
			height: 350,
		}
	);
	const [filters, setFilters] = useState({
		seasons: [],
		weathers: [],
		locations: [],
		ingredients: [],
		showSkills: false,
		showDiveable: false,
		showMissing: false,
	});
	const [anchorEl, setAnchorEl] = useState(null);

	// Utils /////////////////////////////////////////////////////////////////
	const keysToLowerCase = (obj) => {
		return Object.keys(obj).reduce((acc, key) => {
			acc[key.toLowerCase()] = obj[key];
			return acc;
		}, {});
	};

	// Effect Hooks ///////////////////////////////////////////////////////////////
	useEffect(() => {
		const savedContainerSize = JSON.parse(
			localStorage.getItem('blacksmithingTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}

		const savedCaughtBlacksmithings =
			JSON.parse(localStorage.getItem('caughtBlacksmithings')) || {};
		let filteredBlacksmithings = blacksmithingData.filter(
			(f) => f.Ignore !== 'Yes'
		);
		if (museumOnly) {
			filteredBlacksmithings = filteredBlacksmithings.filter(
				(f) => f.Museum === 'Yes'
			);
		}
		const updatedBlacksmithings = filteredBlacksmithings.map((f) => {
			const lowerCaseBlacksmithings = keysToLowerCase(f);
			return {
				...lowerCaseBlacksmithings,
				caught: !!savedCaughtBlacksmithings[lowerCaseBlacksmithings.name],
			};
		});
		setBlacksmithings(updatedBlacksmithings);
	}, [museumOnly]);

	// Handlers /////////////////////////////////////////////////////////////////
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
				// Toggle the boolean value for showMissing
				updatedFilters.showMissing = !prevFilters.showMissing;
			} else if (
				['seasons', 'weathers', 'locations', 'ingredients'].includes(filterType)
			) {
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

	const filterBlacksmithings = () => {
		return blacksmithings.filter((f) => {
			const matchesIngredient =
				filters.ingredients.length === 0 ||
				filters.ingredients.some((ingredient) =>
					f.ingredient.includes(ingredient)
				);
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

			// Only return items that match all active filters
			return (
				matchesIngredient &&
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

	const countCaughtBlacksmithings = () =>
		blacksmithings.filter((f) => f.caught).length;

	const toggleCaught = (blacksmithingName) => {
		const updatedBlacksmithings = blacksmithings.map((f) =>
			f.name === blacksmithingName ? { ...f, caught: !f.caught } : f
		);
		setBlacksmithings(updatedBlacksmithings);

		const savedCaughtBlacksmithings =
			JSON.parse(localStorage.getItem('caughtBlacksmithings')) || {};
		savedCaughtBlacksmithings[blacksmithingName] =
			!savedCaughtBlacksmithings[blacksmithingName];
		localStorage.setItem(
			'caughtBlacksmithings',
			JSON.stringify(savedCaughtBlacksmithings)
		);
	};

	const getSkillIcon = (level) => (
		<>
			<img
				height={18}
				width={16}
				src="misc/blacksmithing.webp"
				alt="blacksmithing"
				key="blacksmithing"
			/>
			<Typography marginLeft={1}>Level: {level}</Typography>
		</>
	);

	const getIngredients = (ingredient) => {
		let ingredientName =
			ingredient.split(' ')[0] + '_' + ingredient.split(' ')[1];
		return (
			<>
				<img
					src={`blacksmithing/${ingredientName
						.replace(/ /g, '_')
						.toLowerCase()}.webp`}
					alt={ingredientName}
					style={{ width: '30px', height: '30px' }}
				/>
				<Typography marginLeft={0}>{ingredient}</Typography>
			</>
		);
	};

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
					'blacksmithingTrackerContainerSize',
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
						Blacksmithing Tracker ({countCaughtBlacksmithings()} /{' '}
						{blacksmithings.length})
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
						{filterBlacksmithings().map((f) => (
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
										{f.ingredient && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Ingredients
													</Typography>
													<Box display="flex" alignItems="center">
														{getIngredients(f.ingredient)}
													</Box>
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
									sx={
										caughtHighlighting
											? {
													filter: f.caught ? 'grayscale(0)' : 'grayscale(1)',
													backgroundColor: f.caught ? '#66bb6a7d' : 'inherit',
													'&:hover': {
														backgroundColor: f.caught ? '#66bb6aaf' : '',
													},
												}
											: { filter: f.caught ? 'grayscale(0)' : 'grayscale(1)' }
									}
								>
									<img
										src={`blacksmithing/${f.name
											.replace(/ /g, '_')
											.toLowerCase()}.webp`}
										alt={f.name}
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

export default BlacksmithingTracker;

if (!import.meta.env.PROD) {
	BlacksmithingTracker.propTypes = {
		tooltipsEnabled: PropTypes.bool,
		editMode: PropTypes.bool,
		museumOnly: PropTypes.bool,
		backgroundColor: PropTypes.string,
		caughtHighlighting: PropTypes.bool,
	};
}
