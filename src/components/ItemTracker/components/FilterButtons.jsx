import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';

const FilterButtons = ({
	filters,
	tooltipsEnabled,
	toggleFilter,
	setFilters,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexWrap: 'wrap',
				margin: 0,
				backgroundColor: '#3a49b22f',
			}}
		>
			{/* Location Filter */}
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				padding={1}
			>
				<ToggleButtonGroup
					color="info"
					value={filters.seasons}
					exclusive={false}
					size="small"
				>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Spring"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Spring"
							onClick={() => toggleFilter('seasons', 'Spring')}
							selected={filters.seasons.includes('Spring')}
						>
							<img
								height={24}
								width={24}
								src="misc/spring.webp"
								alt="spring"
								key="spring"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Summer"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Summer"
							onClick={() => toggleFilter('seasons', 'Summer')}
							selected={filters.seasons.includes('Summer')}
						>
							<img
								height={24}
								width={24}
								src="misc/summer.webp"
								alt="summer"
								key="summer"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Fall"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Fall"
							onClick={() => toggleFilter('seasons', 'Fall')}
							selected={filters.seasons.includes('Fall')}
						>
							<img
								height={24}
								width={24}
								src="misc/fall.webp"
								alt="fall"
								key="fall"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Winter"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							color="primary"
							onClick={() => toggleFilter('seasons', 'Winter')}
						>
							<img
								height={24}
								width={24}
								src="misc/winter.webp"
								alt="winter"
								key="winter"
							/>
						</ToggleButton>
					</Tooltip>
				</ToggleButtonGroup>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				padding={1}
			>
				<ToggleButtonGroup
					value={filters.weathers}
					exclusive={false}
					size="small"
				>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="The Narrows"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'the narrows')}
							selected={filters.locations.includes('the narrows')}
							sx={{ width: '40px' }}
						>
							<Typography fontSize={16}>N</Typography>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="The Eastern Road"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'the eastern road')}
							selected={filters.locations.includes('the eastern road')}
							sx={{ width: '40px' }}
						>
							<Typography fontSize={16}>E</Typography>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Sweetwater Farm"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'sweetwater farm')}
							selected={filters.locations.includes('sweetwater farm')}
							sx={{ width: '40px' }}
						>
							<Typography fontSize={16}>S</Typography>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="The Western Ruins"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'the western ruins')}
							selected={filters.locations.includes('the western ruins')}
							sx={{ width: '40px' }}
						>
							<Typography fontSize={16}>W</Typography>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Overworld"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'overworld')}
							selected={filters.locations.includes('overworld')}
							sx={{ width: '40px' }}
						>
							<Typography fontSize={16}>O</Typography>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Mines"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('locations', 'mine')}
							selected={filters.locations.includes('mine')}
						>
							<img
								height={24}
								width={24}
								src="misc/mine.webp"
								alt="mine"
								key="mine"
							/>
						</ToggleButton>
					</Tooltip>
				</ToggleButtonGroup>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				padding={1}
			>
				<ToggleButtonGroup exclusive={false} size="small">
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Museum"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('showMuseum')}
							selected={filters.showMuseum}
						>
							<img
								height={24}
								width={24}
								src="misc/museum.webp"
								alt="museum"
								key="museum"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Show Only Missing"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							onClick={() => toggleFilter('showMissing')}
							selected={filters.showMissing}
						>
							<img
								height={24}
								width={24}
								src="fish/wooden_chest.webp"
								alt="missing"
								key="missing"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Clear Filters"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
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
							<HighlightOffIcon color="error" />
						</ToggleButton>
					</Tooltip>
				</ToggleButtonGroup>
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
