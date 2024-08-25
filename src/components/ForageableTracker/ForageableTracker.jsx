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
	Collapse,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Resizable } from 're-resizable';

// Components, Hooks, & Utils /////////////////////////////////////////////////
import FilterButtons from './components/FilterButtons';
import forageableData from '../../data/forageable.json';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function ForageableTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
}) {
	// State Hooks ////////////////////////////////////////////////////
	const [forageables, setForageables] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('forageableTrackerContainerSize')) || {
			width: 750,
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
			localStorage.getItem('forageableTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}
		const savedCaughtForageables =
			JSON.parse(localStorage.getItem('caughtForageables')) || {};
		let filteredForageables = forageableData.filter((f) => f.Ignore !== 'Yes');
		if (museumOnly) {
			filteredForageables = filteredForageables.filter(
				(f) => f.Museum === 'Yes'
			);
		}
		const updatedForageables = filteredForageables.map((f) => {
			const lowerCaseForageables = keysToLowerCase(f);
			return {
				...lowerCaseForageables,
				caught: !!savedCaughtForageables[lowerCaseForageables.name],
			};
		});
		setForageables(updatedForageables);
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

	const filterForageables = () => {
		return forageables.filter((f) => {
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
				(f.location.toLowerCase().includes('overworld') &&
					!filters.locations.includes('mine')) ||
				(filters.locations.includes('mine') &&
					f.location.toLowerCase().includes('mine' || 'floor'));
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

	const countCaughtForageables = () =>
		forageables.filter((f) => f.caught).length;

	const toggleCaught = (forageableName) => {
		const updatedForageables = forageables.map((f) =>
			f.name === forageableName ? { ...f, caught: !f.caught } : f
		);
		setForageables(updatedForageables);

		const savedCaughtForageables =
			JSON.parse(localStorage.getItem('caughtForageables')) || {};
		savedCaughtForageables[forageableName] =
			!savedCaughtForageables[forageableName];
		localStorage.setItem(
			'caughtForageables',
			JSON.stringify(savedCaughtForageables)
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
					'forageableTrackerContainerSize',
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
						Forageable Tracker ({countCaughtForageables()} /{' '}
						{forageables.length})
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
						{filterForageables().map((f) => (
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
										{f.season[0] !== 'All' && (
											<Box display="flex" alignItems="center">
												{handleSeasonIcons(f.season)}
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
										src={`forageable/${f.name
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

ForageableTracker.propTypes = {
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
	caughtHighlighting: PropTypes.bool,
};

export default ForageableTracker;
