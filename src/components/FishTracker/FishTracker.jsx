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
import fishData from '../../data/fish.json';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function FishTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
}) {
	// State Hooks ////////////////////////////////////////////////////
	const [fish, setFish] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('fishTrackerContainerSize')) || {
			width: 965,
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
			localStorage.getItem('fishTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}
		const savedCaughtFish =
			JSON.parse(localStorage.getItem('caughtFish')) || {};
		let filteredFish = fishData.filter((f) => f.Ignore !== 'Yes');
		if (museumOnly) {
			filteredFish = filteredFish.filter((f) => f.Museum === 'Yes');
		}
		const updatedFish = filteredFish.map((f) => {
			const lowerCaseFish = keysToLowerCase(f);
			return {
				...lowerCaseFish,
				caught: !!savedCaughtFish[lowerCaseFish.name],
			};
		});
		setFish(updatedFish);
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

	const filterFish = () => {
		return fish.filter((f) => {
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
				!f.location ||
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

	const countCaughtFish = () => {
		return fish.filter((f) => f.caught).length;
	};

	const toggleCaught = (fishName) => {
		const updatedFish = fish.map((f) =>
			f.name === fishName ? { ...f, caught: !f.caught } : f
		);
		setFish(updatedFish);

		const savedCaughtFish =
			JSON.parse(localStorage.getItem('caughtFish')) || {};
		savedCaughtFish[fishName] = !savedCaughtFish[fishName];
		localStorage.setItem('caughtFish', JSON.stringify(savedCaughtFish));
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
				default:
					return null;
			}
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
						Fish Tracker ({countCaughtFish()} / {fish.length})
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
						{filterFish().map((f) => (
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
										<Paper>
											<Box>
												<Typography variant="caption" marginLeft={1}>
													Size
												</Typography>
												<Typography marginLeft={2}>{f.size}</Typography>
											</Box>
										</Paper>
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
											{f.diveable === 'Yes' && (
												<img
													height={24}
													width={24}
													src="misc/diveable.png"
													alt="diveable"
													style={{
														filter:
															'sepia(1) hue-rotate(190deg) saturate(600%)',
													}}
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
										src={`fish/${f.name.replace(/ /g, '_')}.webp`}
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

FishTracker.propTypes = {
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
	caughtHighlighting: PropTypes.bool,
};

export default FishTracker;
