// Libraries & Frameworks ///////////////////////////////////////////
import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AbcIcon from '@mui/icons-material/Abc';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StraightenIcon from '@mui/icons-material/Straighten';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PropTypes from 'prop-types';

// Main Component //////////////////////////////////////////////
const FilterButtons = ({
	filters,
	config,
	tooltipsEnabled,
	toggleFilter,
	setFilters,
	selectedSort,
	setSelectedSort,
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
			{config.sortOptions.length === 0 ? null : (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					padding={1}
				>
					<ToggleButtonGroup
						value={selectedSort}
						exclusive
						size="small"
						onChange={(event, newSort) => setSelectedSort(newSort)}
					>
						{config.sortOptions.map((option) => (
							<Tooltip
								key={option.type}
								title={option.label}
								arrow
								disableInteractive
								placement="top"
								disableHoverListener={!tooltipsEnabled}
							>
								<ToggleButton key={option.type} value={option.type}>
									{getSortIcon(option.type, config.name)}
								</ToggleButton>
							</Tooltip>
						))}
					</ToggleButtonGroup>
				</Box>
			)}

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
								src="misc/chest.webp"
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
									buildings: [],
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
const getSortIcon = (sortType, name) => {
	switch (sortType) {
		case 'name':
			return <AbcIcon />;
		case 'size':
			return <StraightenIcon />;
		case 'rarity':
			return <AutoAwesomeIcon />;
		case 'daycycle':
			return <AccessTimeIcon />;
		case 'time':
			return <AccessTimeIcon />;
			case 'growth':
				return <AccessTimeIcon />;
		case 'level':
			return (
				<img
					height={24}
					width={24}
					style={{
						objectFit: 'contain',
						maxWidth: '100%',
						maxHeight: '100%',
					}}
					src={`misc/${name.toLowerCase()}.webp`}
					alt={name}
				/>
			);
		case 'hearts':
			return (
				<img
					height={24}
					width={24}
					src={`ranching/heart2.webp`}
					alt={name}
				/>
			);
		default:
			return <Typography>{sortType}</Typography>;
	}
};

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
			switch (filterValue) {
				case 'mine':
					return <img height={24} width={24} src="misc/mine.webp" alt="mine" />;
				case 'balor':
					return (
						<img height={24} width={24} src="misc/balor.webp" alt="balor" />
					);
				case 'quest':
					return (
						<img height={24} width={24} src="misc/quest.webp" alt="quest" />
					);
				case 'wooden chest':
					return (
						<img
							height={24}
							width={24}
							src="fish/wooden_chest.webp"
							alt="wooden chest"
						/>
					);
				case 'copper chest':
					return (
						<img
							height={24}
							width={24}
							src="fish/copper_chest.webp"
							alt="copper chest"
						/>
					);
				default:
					return (
						<Typography fontSize={16}>
							{filterValue.charAt(0).toUpperCase()}
						</Typography>
					);
			}
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
		case 'buildings':
			return (
				<img
					height={24}
					width={24}
					src={`ranching/${filterValue.toLowerCase()}.webp`}
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
				<img
					height={24}
					width={24}
					src="misc/diveable.png"
					alt="diveable"
					style={{
						filter: 'sepia(1) hue-rotate(190deg) saturate(600%)',
					}}
				/>
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
		selectedSort: PropTypes.string,
		setSelectedSort: PropTypes.func,
	};
}
