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
import bugData from '../../data/bug.json';
import FilterButtons from './components/FilterButtons';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function BugTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
}) {
	// State Hooks ////////////////////////////////////////////////////
	const [bugs, setBugs] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('bugTrackerContainerSize')) || {
			width: 630,
			height: 350,
		}
	);
	const [filters, setFilters] = useState({
		seasons: [],
		weathers: [],
		locations: [],
		showMuseum: false,
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
			localStorage.getItem('bugTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}
		const savedCaughtBugs =
			JSON.parse(localStorage.getItem('caughtBugs')) || {};
		let filteredBugs = bugData.filter((f) => f.Ignore !== 'Yes');
		if (museumOnly) {
			filteredBugs = filteredBugs.filter((f) => f.Museum === 'Yes');
		}
		const updatedBugs = filteredBugs.map((f) => {
			const lowerCaseBugs = keysToLowerCase(f);
			return {
				...lowerCaseBugs,
				caught: !!savedCaughtBugs[lowerCaseBugs.name],
			};
		});
		setBugs(updatedBugs);
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
				// Toggle the boolean value for showMissing
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

	const filterBugs = () => {
		return bugs.filter((f) => {
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
				filters.locations.includes(f.location.toLowerCase()) ||
				(filters.locations.includes('mine') &&
					f.location.toLowerCase().endsWith('(mines)'));
			const matchesMuseum =
				!filters.showMuseum || f.museum.toLowerCase() === 'yes';
			const matchesDiveable =
				!filters.showDiveable || f.diveable.toLowerCase() === 'yes';
			const matchesMissing = !filters.showMissing || !f.caught;

			return (
				matchesSeason &&
				matchesWeather &&
				matchesLocation &&
				matchesMuseum &&
				matchesDiveable &&
				matchesMissing
			);
		});
	};

	const countCaughtBugs = () => {
		return bugs.filter((f) => f.caught).length;
	};

	const toggleCaught = (bugName) => {
		const updatedBugs = bugs.map((f) =>
			f.name === bugName ? { ...f, caught: !f.caught } : f
		);
		setBugs(updatedBugs);

		// Update local storage
		const savedCaughtBugs =
			JSON.parse(localStorage.getItem('caughtBugs')) || {};
		savedCaughtBugs[bugName] = !savedCaughtBugs[bugName];
		localStorage.setItem('caughtBugs', JSON.stringify(savedCaughtBugs));
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
					'artifactTrackerContainerSize',
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
						Bug Tracker ({countCaughtBugs()} / {bugs.length})
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
						{filterBugs().map((f) => (
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
										{f.location && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Location
													</Typography>
													<Typography marginLeft={2}>{f.location}</Typography>
												</Box>
											</Paper>
										)}
										{f.time !== 'All day' && f.time && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Time
													</Typography>
													<Typography marginLeft={2}>
														{f.time} {getTimeRange(f.time)}
													</Typography>
												</Box>
											</Paper>
										)}
										{f.spawn && (
											<Paper>
												<Box>
													<Typography variant="caption" marginLeft={1}>
														Spawn
													</Typography>
													<Typography marginLeft={2}>{f.spawn}</Typography>
												</Box>
											</Paper>
										)}
										{f.season[0] !== 'All' && (
											<Box display="flex" alignItems="center">
												{handleSeasonIcons(f.season)}
											</Box>
										)}
										{f.weather[0] !== 'Any' && (
											<Box display="flex" alignItems="center">
												{handleWeatherIcons(f.weather)}
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
										src={`bug/${f.name.replace(/ /g, '_')}.webp`}
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

BugTracker.propTypes = {
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
	caughtHighlighting: PropTypes.bool,
};

export default BugTracker;
