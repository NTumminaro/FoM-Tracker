import { useState, useEffect, lazy, Suspense } from 'react';
import { Box, CssBaseline, IconButton, Stack, SvgIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Header from '../components/Header/Header';
import PropTypes from 'prop-types';

const dataFiles = {
	fish: () => import('../data/fish.json'),
	bug: () => import('../data/bug.json'),
	artifact: () => import('../data/artifact.json'),
	forageable: () => import('../data/forageable.json'),
	material: () => import('../data/material.json'),
	cookeddish: () => import('../data/cookedDish.json'),
	blacksmithing: () => import('../data/blacksmithing.json'),
	ranching: () => import('../data/ranching.json'),
	crop: () => import('../data/crop.json'),
	furniture: () => import('../data/furniture.json'),
};

const configFiles = {
	Fish: () => import('../configs/fishConfig'),
	Bug: () => import('../configs/bugConfig'),
	Artifact: () => import('../configs/artifactConfig'),
	Forageable: () => import('../configs/forageableConfig'),
	Material: () => import('../configs/materialConfig'),
	CookedDish: () => import('../configs/cookeddishConfig'),
	Blacksmithing: () => import('../configs/blacksmithingConfig'),
	Ranching: () => import('../configs/ranchingConfig'),
	Crop: () => import('../configs/cropConfig'),
	Furniture: () => import('../configs/furnitureConfig'),
};

const ItemTracker = lazy(() => import('../components/ItemTracker/ItemTracker'));

const MainLayout = () => {
	const DiscordIcon = (props) => (
		<SvgIcon {...props} viewBox="0 0 24 24">
			<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
		</SvgIcon>
	);

	const [tooltipsEnabled, setTooltipsEnabled] = useState(() => {
		return JSON.parse(localStorage.getItem('tooltipsEnabled')) ?? true;
	});
	const [caughtHighlighting, setCaughtHighlighting] = useState(() => {
		return JSON.parse(localStorage.getItem('caughtHighlighting')) ?? true;
	});
	const [showUnobtainable, setShowUnobtainable] = useState(() => {
		return JSON.parse(localStorage.getItem('showUnobtainable')) ?? false;
	});
	const [editMode, setEditMode] = useState(false);
	const [museumOnly, setMuseumOnly] = useState(() => {
		return JSON.parse(localStorage.getItem('museumOnly')) ?? false;
	});
	const [displayedTrackers, setDisplayedTrackers] = useState(() => {
		return (
			JSON.parse(localStorage.getItem('displayedTrackers')) ?? [
				'Fish',
				'Bug',
				'Artifact',
				'Forageable',
				'Material',
				'CookedDish',
				'Blacksmithing',
				'Ranching',
				'Crop',
				'Furniture',
			]
		);
	});
	const [backgroundColor, setBackgroundColor] = useState(() => {
		return localStorage.getItem('backgroundColor') || '#303030';
	});

	useEffect(() => {
		localStorage.setItem('tooltipsEnabled', JSON.stringify(tooltipsEnabled));
	}, [tooltipsEnabled]);

	useEffect(() => {
		localStorage.setItem(
			'caughtHighlighting',
			JSON.stringify(caughtHighlighting)
		);
	}, [caughtHighlighting]);

	useEffect(() => {
		localStorage.setItem('showUnobtainable', JSON.stringify(showUnobtainable));
	}, [showUnobtainable]);

	useEffect(() => {
		localStorage.setItem('museumOnly', JSON.stringify(museumOnly));
	}, [museumOnly]);

	useEffect(() => {
		localStorage.setItem(
			'displayedTrackers',
			JSON.stringify(displayedTrackers)
		);
	}, [displayedTrackers]);

	useEffect(() => {
		localStorage.setItem('backgroundColor', backgroundColor);
	}, [backgroundColor]);

	const resetTrackers = () => {
		setTooltipsEnabled(true);
		setCaughtHighlighting(true);
		setShowUnobtainable(false);
		setMuseumOnly(false);
		setDisplayedTrackers([
			'Fish',
			'Bug',
			'Artifact',
			'Forageable',
			'Material',
			'CookedDish',
			'Blacksmithing',
			'Ranching',
			'Crop',
			'Furniture',
		]);
		setBackgroundColor('#303030');

		localStorage.removeItem('tooltipsEnabled');
		localStorage.removeItem('showUnobtainable');
		localStorage.removeItem('museumOnly');
		localStorage.removeItem('displayedTrackers');
		localStorage.removeItem('backgroundColor');
		localStorage.removeItem('caughtHighlighting');

		Object.keys(localStorage).forEach((key) => {
			if (key.startsWith('caught')) {
				localStorage.removeItem(key);
			}
		});

		Object.keys(localStorage).forEach((key) => {
			if (key.endsWith('Size')) {
				localStorage.removeItem(key);
			}
		});

		setMuseumOnly((prev) => !prev);
		setTimeout(() => setMuseumOnly((prev) => !prev), 0);
	};

	const loadTrackerData = async (tracker) => {
		const [data, config] = await Promise.all([
			dataFiles[tracker.toLowerCase()](),
			configFiles[tracker](),
		]);

		return {
			data: data.default,
			config: config.default,
		};
	};

	const toggleTooltips = () => {
		setTooltipsEnabled((prev) => !prev);
	};

	const toggleShowUnobtainable = () => {
		setShowUnobtainable((prev) => !prev);
		setMuseumOnly((prev) => !prev);
		setTimeout(() => setMuseumOnly((prev) => !prev), 0);
	};

	const toggleEditMode = () => {
		setEditMode((prev) => !prev);
	};

	const toggleCaughtHighlighting = () => {
		setCaughtHighlighting((prev) => !prev);
	};

	const toggleMuseumOnly = () => {
		setMuseumOnly((prev) => !prev);
	};

	const toggleTracker = (tracker) => {
		setDisplayedTrackers((prev) =>
			prev.includes(tracker)
				? prev.filter((t) => t !== tracker)
				: [...prev, tracker]
		);
	};

	return (
		<Box sx={{ display: 'flex', width: '100%', height: '98vh' }}>
			<CssBaseline />
			<Header
				resetTrackers={resetTrackers}
				toggleTooltips={toggleTooltips}
				toggleEditMode={toggleEditMode}
				toggleMuseumOnly={toggleMuseumOnly}
				toggleShowUnobtainable={toggleShowUnobtainable}
				editMode={editMode}
				tooltipsEnabled={tooltipsEnabled}
				showUnobtainable={showUnobtainable}
				museumOnly={museumOnly}
				displayedTrackers={displayedTrackers}
				toggleTracker={toggleTracker}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				caughtHighlighting={caughtHighlighting}
				toggleCaughtHighlighting={toggleCaughtHighlighting}
			/>
			<Box
				display={'flex'}
				flexWrap={'wrap'}
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					marginTop: '48px',
				}}
			>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"
					justifyContent={'start'}
					alignContent={'flex-start'}
					sx={{ userSelect: 'none' }}
				>
					{displayedTrackers.map((tracker) => (
						<Suspense
							fallback={<div>Loading {tracker} Tracker...</div>}
							key={tracker}
						>
							<ItemTrackerLoader
								tracker={tracker}
								loadTrackerData={loadTrackerData}
								tooltipsEnabled={tooltipsEnabled}
								editMode={editMode}
								museumOnly={museumOnly}
								backgroundColor={backgroundColor}
								caughtHighlighting={caughtHighlighting}
								showUnobtainable={showUnobtainable}
							/>
						</Suspense>
					))}
				</Stack>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: 12,
					right: 12,
					display: 'flex',
					gap: 1,
				}}
			>
				<IconButton
					color="secondary"
					component="a"
					href="https://github.com/NTumminaro/FoM-Tracker"
					target="_blank"
					rel="noopener noreferrer"
					size="small"
				>
					<GitHubIcon sx={{ fontSize: '18px' }} />
				</IconButton>
				<IconButton
					color="secondary"
					component="a"
					href="https://discord.gg/suEZrgwXRF"
					target="_blank"
					rel="noopener noreferrer"
					size="small"
				>
					<DiscordIcon sx={{ fontSize: '18px' }} />
				</IconButton>
				<IconButton
					color="secondary"
					component="a"
					href="https://www.youtube.com/@misterstealyourgil"
					target="_blank"
					rel="noopener noreferrer"
					size="small"
				>
					<YouTubeIcon sx={{ fontSize: '20px' }} />
				</IconButton>
			</Box>
		</Box>
	);
};

const ItemTrackerLoader = ({
	tracker,
	loadTrackerData,
	tooltipsEnabled,
	editMode,
	museumOnly,
	backgroundColor,
	caughtHighlighting,
	showUnobtainable,
}) => {
	const [trackerData, setTrackerData] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			const data = await loadTrackerData(tracker);
			setTrackerData(data);
		};
		loadData();
	}, [tracker, loadTrackerData]);

	if (!trackerData) {
		return null;
	}

	return (
		<ItemTracker
			config={trackerData.config}
			data={trackerData.data}
			tooltipsEnabled={tooltipsEnabled}
			editMode={editMode}
			museumOnly={museumOnly}
			backgroundColor={backgroundColor}
			caughtHighlighting={caughtHighlighting}
			showUnobtainable={showUnobtainable}
		/>
	);
};

// Proptypes /////////////////////////////
ItemTrackerLoader.propTypes = {
	tracker: PropTypes.string.isRequired,
	loadTrackerData: PropTypes.func.isRequired,
	tooltipsEnabled: PropTypes.bool.isRequired,
	editMode: PropTypes.bool.isRequired,
	museumOnly: PropTypes.bool.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	caughtHighlighting: PropTypes.bool.isRequired,
	showUnobtainable: PropTypes.bool.isRequired,
};

export default MainLayout;
