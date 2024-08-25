import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';

const FilterButtons = ({
	filters,
	tooltipsEnabled,
	toggleFilter,
	setFilters,
}) => {
	let isThereFilters =
		filters.seasons.length > 0 ||
		filters.weathers.length > 0 ||
		filters.locations.length > 0 ||
		filters.ingredients.length > 0 ||
		filters.showMuseum ||
		filters.showSkills ||
		filters.showDiveable ||
		filters.showMissing;

	console.log('FilterButtons.jsx, filters:', filters);
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
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				padding={1}
			>
				<ToggleButtonGroup
					color="info"
					value={filters.ingredients}
					exclusive={false}
					size="small"
				>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Copper"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Copper"
							onChange={(e, newValue) => toggleFilter('ingredients', newValue)}
							selected={filters.ingredients.includes('Copper')}
						>
							<img
								height={24}
								width={24}
								src="blacksmithing/copper_ingot.webp"
								alt="copper"
								key="copper"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Iron"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Iron"
							onChange={(e, newValue) => toggleFilter('ingredients', newValue)}
							selected={filters.ingredients.includes('Iron')}
						>
							<img
								height={24}
								width={24}
								src="blacksmithing/iron_ingot.webp"
								alt="iron"
								key="iron"
							/>
						</ToggleButton>
					</Tooltip>
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Silver"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="Silver"
							onChange={(e, newValue) => toggleFilter('ingredients', newValue)}
							selected={filters.ingredients.includes('Silver')}
						>
							<img
								height={24}
								width={24}
								src="blacksmithing/silver_ingot.webp"
								alt="silver"
								key="silver"
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
				{/* <Divider orientation={'vertical'} flexItem sx={{ marginX: 1 }} /> */}

				<ToggleButtonGroup color="info" exclusive={false} size="small">
					<Tooltip
						disableHoverListener={!tooltipsEnabled}
						title="Show Only Missing"
						placement="top"
						arrow
						disableInteractive
					>
						<ToggleButton
							value="showMissing"
							selected={filters.showMissing}
							onChange={() => toggleFilter('showMissing')}
						>
							<img
								height={24}
								width={24}
								src="fish/Wooden_Chest.webp"
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
							value="showMissing"
							selected={isThereFilters}
							onClick={() =>
								setFilters({
									seasons: [],
									weathers: [],
									locations: [],
									ingredients: [],
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
