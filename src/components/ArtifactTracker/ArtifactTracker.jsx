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
import artifactData from '../../data/artifact.json';
import ResizeHandle from '../ResizeHandle';
import PropTypes from 'prop-types';

// Main Component ////////////////////////////////////////////////////
function ArtifactTracker({
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
}) {
	// State Hooks ////////////////////////////////////////////////////
	const [artifacts, setArtifacts] = useState([]);
	const [containerSize, setContainerSize] = useState(
		JSON.parse(localStorage.getItem('artifactTrackerContainerSize')) || {
			width: 965,
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
			localStorage.getItem('artifactTrackerContainerSize')
		);
		if (savedContainerSize) {
			setContainerSize({
				width: savedContainerSize.width,
				height: savedContainerSize.height,
			});
		}

		const savedCaughtArtifacts =
			JSON.parse(localStorage.getItem('caughtArtifacts')) || {};
		let filteredArtifacts = artifactData.filter((f) => f.Ignore !== 'Yes');
		if (museumOnly) {
			filteredArtifacts = filteredArtifacts.filter((f) => f.Museum === 'Yes');
		}
		const updatedArtifacts = filteredArtifacts.map((f) => {
			const lowerCaseArtifacts = keysToLowerCase(f);
			return {
				...lowerCaseArtifacts,
				caught: !!savedCaughtArtifacts[lowerCaseArtifacts.name],
			};
		});
		setArtifacts(updatedArtifacts);
	}, [museumOnly]);

	console.log(containerSize);

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

	const filterArtifacts = () => {
		return artifacts.filter((f) => {
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
					f.location.toLowerCase().includes('mine')) ||
				f.location.toLowerCase().includes('floor');
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
				matchesDiveable &&
				matchesSkills &&
				matchesMissing
			);
		});
	};

	const countCaughtArtifacts = () => artifacts.filter((f) => f.caught).length;

	const toggleCaught = (artifactName) => {
		const updatedArtifacts = artifacts.map((f) =>
			f.name === artifactName ? { ...f, caught: !f.caught } : f
		);
		setArtifacts(updatedArtifacts);

		const savedCaughtArtifacts =
			JSON.parse(localStorage.getItem('caughtArtifacts')) || {};
		savedCaughtArtifacts[artifactName] = !savedCaughtArtifacts[artifactName];
		localStorage.setItem(
			'caughtArtifacts',
			JSON.stringify(savedCaughtArtifacts)
		);
	};

	const getSkillIcon = (skill, level) => {
		if (skill === 'Fishing') {
			return (
				<>
					<img
						height={12}
						width={18}
						src="misc/fishing.webp"
						alt="fishing"
						key="fishing"
					/>
					<Typography marginLeft={1}>Level: {level}</Typography>
				</>
			);
		} else if (skill === 'Archaeology') {
			return (
				<>
					<img
						height={16}
						width={20}
						src="misc/archaeology.webp"
						alt="archaeology"
						key="archaeology"
					/>
					<Typography marginLeft={1}>Level: {level}</Typography>
				</>
			);
		}
	};

	const getEssenceIcon = (essence) => {
		return (
			<>
				<img
					height={20}
					width={20}
					src="misc/essence.webp"
					alt="essence"
					key="essence"
				/>
				<Typography marginLeft={1}>Cost: {essence}</Typography>
			</>
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
						Artifact Tracker ({countCaughtArtifacts()} / {artifacts.length})
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
						{filterArtifacts().map((f) => (
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
											<>
												<Paper>
													<Box>
														<Typography variant="caption" marginLeft={1}>
															Location
														</Typography>
														<Typography marginLeft={2}>{f.location}</Typography>
													</Box>
												</Paper>
											</>
										)}
										{f.condition && (
											<>
												<Paper>
													<Box>
														<Typography variant="caption" marginLeft={1}>
															Condition
														</Typography>
														<Typography marginLeft={2}>
															{f.condition}
														</Typography>
													</Box>
												</Paper>
											</>
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
										{f.requiredlevel && (
											<Box display="flex" alignItems="center">
												{getSkillIcon(f.skill, f.requiredlevel)}
											</Box>
										)}
										{f.essence && (
											<Box display="flex" alignItems="center">
												{getEssenceIcon(f.essence)}
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
										src={`artifact/${f.name.replace(/ /g, '_').toLowerCase()}.webp`}
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

ArtifactTracker.propTypes = {
	tooltipsEnabled: PropTypes.bool,
	editMode: PropTypes.bool,
	museumOnly: PropTypes.bool,
	backgroundColor: PropTypes.string,
	caughtHighlighting: PropTypes.bool,
};

export default ArtifactTracker;
