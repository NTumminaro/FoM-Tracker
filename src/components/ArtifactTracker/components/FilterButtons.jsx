import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';

const FilterButtons = ({
	filters,
	tooltipsEnabled,
	toggleFilter,
	isVerticalLayout,
	setFilters,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'centder',
				flexDirection: isVerticalLayout ? 'column' : 'row',
				flexWrap: 'wrap',
				padding: 1,
				backgroundColor: 'background.header',
			}}
		>
			{/* Location Filter */}
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection={isVerticalLayout ? 'column' : 'row'}
			>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="The Narrows"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('the narrows')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'the narrows')}
					>
						<Typography fontSize={24}>N</Typography>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="The Eastern Road"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('the eastern road')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'the eastern road')}
					>
						<Typography fontSize={24}>E</Typography>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Sweetwater Farm"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('sweetwater farm')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'sweetwater farm')}
					>
						<Typography fontSize={24}>S</Typography>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="The Western Ruins"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('the western ruins')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'The Western Ruins')}
					>
						<Typography fontSize={24}>W</Typography>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Mines"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('locations', 'mine')}
						sx={{
							filter: filters.locations.includes('mine')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/mine.webp"
							alt="mine"
							key="mine"
						/>
					</IconButton>
				</Tooltip>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection={isVerticalLayout ? 'column' : 'row'}
			>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Museum"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('showMuseum')}
						sx={{
							filter: filters.showMuseum ? 'grayscale(0)' : 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/museum.webp"
							alt="museum"
							key="museum"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Requires Skills"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('showSkills')}
						sx={{
							filter: filters.showSkills ? 'grayscale(0)' : 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/essence.webp"
							alt="essence"
							key="essence"
						/>
					</IconButton>
				</Tooltip>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection={isVerticalLayout ? 'column' : 'row'}
			>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Show Only Missing"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('showMissing')}
						sx={{
							filter: filters.showMissing ? 'grayscale(0)' : 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/pickaxe.webp"
							alt="missing"
							key="missing"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Clear Filters"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="error"
						onClick={() =>
							setFilters({
								seasons: [],
								weathers: [],
								locations: [],
								showMuseum: false,
								showSkills: false,
								showDiveable: false,
								showMissing: false,
							})
						}
					>
						<HighlightOffIcon />
					</IconButton>
				</Tooltip>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
			</Box>
		</Box>
	);
};

export default FilterButtons;

// PropTypes ////////////////////////////////////////////////////
if (!import.meta.env.PROD) {
	FilterButtons.propTypes = {
		filters: PropTypes.object,
		tooltipsEnabled: PropTypes.bool,
		toggleFilter: PropTypes.func,
		isVerticalLayout: PropTypes.bool,
		setFilters: PropTypes.func,
	};
}
