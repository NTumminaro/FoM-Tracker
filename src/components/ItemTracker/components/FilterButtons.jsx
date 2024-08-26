// Libraries & Frameworks ///////////////////////////////////////////
import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';

// Main Component //////////////////////////////////////////////
const FilterButtons = ({
	filters,
	config,
	tooltipsEnabled,
	toggleFilter,
	setFilters,
}) => {
	// Render //////////////////////////////////////////////////
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'start',
				alignItems: 'center',
				flexWrap: 'wrap',
				margin: 0,
				backgroundColor: '#3a49b22f',
			}}
		>
			{Object.keys(config.filterGroups).map((groupKey) => {
				const group = config.filterGroups[groupKey];
				return (
					<Box
						key={groupKey}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						padding={1}
					>
						<ToggleButtonGroup
							value={filters[groupKey]}
							exclusive={false}
							size="small"
						>
							{group.filters.map((filter) => {
								const filterValue =
									typeof filter === 'string' ? filter : filter.type;
								const filterLabel =
									typeof filter === 'string' ? filter : filter.label;

								return (
									<Tooltip
										key={filterValue}
										disableHoverListener={!tooltipsEnabled}
										title={filterLabel}
										placement="top"
										arrow
										disableInteractive
									>
										<ToggleButton
											value={filterValue}
											sx={{ width: '40px' }}
											onClick={() => toggleFilter(groupKey, filterValue)}
											selected={
												Array.isArray(filters[groupKey])
													? filters[groupKey]?.includes(filterValue)
													: filters[groupKey]
											}
										>
											{getFilterIcon(groupKey, filterValue)}
										</ToggleButton>
									</Tooltip>
								);
							})}
						</ToggleButtonGroup>
					</Box>
				);
			})}
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				padding={1}
			>
				<ToggleButtonGroup exclusive={false} size="small">
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
									locations: [],
									weathers: [],
									kitchen: [],
									materials: [],
									attributes: [],
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

// Helper Functions ///////////////////////////////////////////
const getFilterIcon = (filterType, filterValue) => {
	switch (filterType) {
		case 'seasons':
			return (
				<img
					height={24}
					width={24}
					src={`misc/${filterValue.toLowerCase()}.webp`}
					alt={filterValue}
				/>
			);
		case 'locations':
			return filterValue === 'mine' ? (
				<img height={24} width={24} src="misc/mine.webp" alt="mine" />
			) : (
				<Typography fontSize={16}>
					{filterValue.charAt(0).toUpperCase()}
				</Typography>
			);
		case 'weathers':
			return (
				<img
					height={24}
					width={24}
					src={`weather/${filterValue.toLowerCase()}.webp`}
					alt={filterValue}
				/>
			);
		case 'kitchen':
			return (
				<img
					height={24}
					width={24}
					src={`cookeddish/kitchen_level_${filterValue.toLowerCase()}.webp`}
					alt={filterValue}
				/>
			);
		case 'materials':
			return (
				<img
					height={24}
					width={24}
					src={`blacksmithing/${filterValue.toLowerCase()}.webp`}
					alt={filterValue}
				/>
			);
		case 'attributes':
			if (filterValue === 'museum') {
				return (
					<img height={24} width={24} src="misc/museum.webp" alt="museum" />
				);
			}
			if (filterValue === 'skill') {
				return (
					<img height={24} width={24} src="misc/essence.webp" alt="skill" />
				);
			}
			return (
				<img height={24} width={24} src="misc/diveable.png" alt="diveable" />
			);
		default:
			return <Typography>{filterValue}</Typography>;
	}
};

export default FilterButtons;

// PropTypes ////////////////////////////////////////////////////
if (!import.meta.env.PROD) {
	FilterButtons.propTypes = {
		filters: PropTypes.object,
		config: PropTypes.object,
		tooltipsEnabled: PropTypes.bool,
		toggleFilter: PropTypes.func,
		isVerticalLayout: PropTypes.bool,
		setFilters: PropTypes.func,
	};
}
