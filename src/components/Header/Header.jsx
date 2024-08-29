import { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	MenuItem,
	Menu,
	ButtonBase,
	ToggleButton,
	Switch,
	ToggleButtonGroup,
	TextField,
	Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

function Header({
	resetTrackers,
	toggleTooltips,
	toggleEditMode,
	editMode,
	tooltipsEnabled,
	showUnobtainable,
	toggleMuseumOnly,
	toggleShowUnobtainable,
	museumOnly,
	displayedTrackers,
	toggleTracker,
	backgroundColor,
	setBackgroundColor,
	caughtHighlighting,
	toggleCaughtHighlighting,
	// borderColor,
	// setBorderColor,
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [bgColorInput, setBgColorInput] = useState(backgroundColor);
	const [debounceTimeout, setDebounceTimeout] = useState(null);
	// const [borderColorInput, setBorderColorInput] = useState(borderColor);

	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleBgColorChange = (event) => {
		const newColor = event.target.value;
		setBgColorInput(newColor);

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		setDebounceTimeout(
			setTimeout(() => {
				setBackgroundColor(newColor);
			}, 300) // 300ms debounce time
		);
	};

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: 'background.appBar',
					width: '100%',
				}}
			>
				<Toolbar variant="dense">
					<ButtonBase sx={{ borderRadius: '14px' }}>
						<Box
							display={'flex'}
							alignItems={'center'}
							sx={{ textDecoration: 'none', '&:hover': { opacity: 0.75 } }}
						>
							<img
								height={24}
								width={24}
								src="misc/almanac.webp"
								alt="almanac"
								key="almanac"
							/>
							<Typography
								variant="h6"
								noWrap
								sx={{ color: 'lightText', marginRight: '4px', marginLeft: 1 }}
							>
								Mistria Tracker
							</Typography>
						</Box>
					</ButtonBase>
					<Box sx={{ flexGrow: 1 }} />
					{editMode && (
						<>
							<TextField
								label="Background Color"
								variant="outlined"
								size="small"
								value={bgColorInput}
								onChange={handleBgColorChange}
								sx={{ width: 150, marginRight: 2 }}
								inputProps={{
									style: { height: '18px', fontSize: '16px' },
								}}
							/>
							{/* <TextField
								label="Border Color"
								variant="outlined"
								size="small"
								value={borderColorInput}
								onChange={handleBorderColorChange}
								sx={{ width: 150, marginRight: 2 }}
								inputProps={{
									style: { height: '18px', fontSize: '16px' },
								}}
							/> */}
							<ToggleButtonGroup
								color="primary"
								value={displayedTrackers}
								aria-label="Tracker Selection"
								size="small"
								sx={{ marginRight: 2 }}
							>
								{[
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
								].map((tracker) => (
									<ToggleButton
										key={tracker}
										onChange={(e, value) => toggleTracker(value)}
										value={tracker}
										sx={{ textTransform: 'none' }}
										color="success"
									>
										{tracker}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</>
					)}
					<>
						<ToggleButton
							sx={{ textTransform: 'none', paddingX: 2, marginRight: 1 }}
							size={'small'}
							value="check"
							selected={editMode}
							onChange={toggleEditMode}
							color="success"
						>
							<EditIcon sx={{ fontSize: 16, marginRight: '4px' }} />
							{editMode ? 'Editing' : 'Edit Layout'}
						</ToggleButton>
						<IconButton onClick={handleMenu} size="small">
							<SettingsIcon sx={{ color: 'lightText' }} />
						</IconButton>
						<Menu
							sx={{ marginTop: '26px' }}
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={resetTrackers}>Reset Trackers</MenuItem>
							<Divider />
							<MenuItem onClick={toggleTooltips} sx={{ height: 36 }}>
								<Typography>Show Tooltips</Typography>
								<Switch
									checked={tooltipsEnabled}
									// onChange={toggleTooltips}
									color="success"
								/>
							</MenuItem>{' '}
							<MenuItem onClick={toggleCaughtHighlighting} sx={{ height: 36 }}>
								<Typography>Highlight Obtained Items</Typography>
								<Switch
									checked={caughtHighlighting}
									// onChange={toggleCaughtHighlighting}
									color="success"
								/>
							</MenuItem>
							<Divider />
							<MenuItem onClick={toggleMuseumOnly} sx={{ height: 36 }}>
								<Typography>Museum Items Only</Typography>
								<Switch
									checked={museumOnly}
									// onChange={toggleMuseumOnly}
									color="success"
								/>
							</MenuItem>
							<MenuItem onClick={toggleShowUnobtainable} sx={{ height: 36 }}>
								<Typography>Show Ignored Items</Typography>
								<Switch
									checked={showUnobtainable}
									// onChange={toggleMuseumOnly}
									color="success"
								/>
							</MenuItem>
						</Menu>
					</>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header;

if (!import.meta.env.PROD) {
	Header.propTypes = {
		resetTrackers: PropTypes.func,
		toggleTooltips: PropTypes.func,
		toggleEditMode: PropTypes.func,
		editMode: PropTypes.bool,
		tooltipsEnabled: PropTypes.bool,
		toggleMuseumOnly: PropTypes.func,
		museumOnly: PropTypes.bool,
		displayedTrackers: PropTypes.array,
		toggleTracker: PropTypes.func,
		backgroundColor: PropTypes.string,
		setBackgroundColor: PropTypes.func,
		borderColor: PropTypes.string,
		setBorderColor: PropTypes.func,
		caughtHighlighting: PropTypes.bool,
		toggleCaughtHighlighting: PropTypes.func,
		showUnobtainable: PropTypes.bool,
		toggleShowUnobtainable: PropTypes.func,
	};
}
