import { Box, Divider, IconButton, Tooltip } from '@mui/material';
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
					title="Diveable"
					placement="top"
					arrow
					disableInteractive
				>
					{/* <IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('showDiveable')}
						sx={{
							filter: filters.showDiveable
								? 'sepia(1) hue-rotate(190deg) saturate(600%)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/diveable.png"
							alt="divable"
							key="divable"
						/>
					</IconButton> */}
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
							src="misc/axe.webp"
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
