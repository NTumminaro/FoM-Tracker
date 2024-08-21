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
					title="Spring"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('seasons', 'Spring')}
						sx={{
							filter: filters.seasons.includes('Spring')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/spring.webp"
							alt="spring"
							key="spring"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Summer"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('seasons', 'Summer')}
						sx={{
							filter: filters.seasons.includes('Summer')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/summer.webp"
							alt="summer"
							key="summer"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Fall"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('seasons', 'Fall')}
						sx={{
							filter: filters.seasons.includes('Fall')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/fall.webp"
							alt="fall"
							key="fall"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Winter"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('seasons', 'Winter')}
						sx={{
							filter: filters.seasons.includes('Winter')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="misc/winter.webp"
							alt="winter"
							key="winter"
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
					title="Sunny"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Sunny')}
						sx={{
							filter: filters.weathers.includes('Sunny')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/sunny.webp"
							alt="sunny"
							key="sunny"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Rainy"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Rainy')}
						sx={{
							filter: filters.weathers.includes('Rainy')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/rainy.webp"
							alt="rainy"
							key="rainy"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Rain"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Rain')}
						sx={{
							filter: filters.weathers.includes('Rain')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/rain.webp"
							alt="rain"
							key="rain"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Storm"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Storm')}
						sx={{
							filter: filters.weathers.includes('Storm')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/storm.webp"
							alt="storm"
							key="storm"
						/>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Thunderstorm"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Thunderstorm')}
						sx={{
							filter: filters.weathers.includes('Thunderstorm')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/thunderstorm.webp"
							alt="thunderstorm"
							key="thunderstorm"
						/>
					</IconButton>
				</Tooltip>
				{/* <Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Snow"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Snow')}
						sx={{
							filter: filters.weathers.includes('Snow')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/snow.webp"
							alt="snow"
							key="snow"
						/>
					</IconButton>
				</Tooltip> */}
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Blizzard"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						variant="contained"
						color="primary"
						onClick={() => toggleFilter('weathers', 'Blizzard')}
						sx={{
							filter: filters.weathers.includes('Blizzard')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
					>
						<img
							height={24}
							width={24}
							src="weather/blizzard.webp"
							alt="blizzard"
							key="blizzard"
						/>
					</IconButton>
				</Tooltip>
				<Divider
					orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
					flexItem
				/>
			</Box>

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
					title="Overworld"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('overworld')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'overworld')}
					>
						<Typography fontSize={24}>O</Typography>
					</IconButton>
				</Tooltip>
				<Tooltip
					disableHoverListener={!tooltipsEnabled}
					title="Beach"
					placement="top"
					arrow
					disableInteractive
				>
					<IconButton
						sx={{
							height: 40,
							width: 40,
							filter: filters.locations.includes('beach')
								? 'grayscale(0)'
								: 'grayscale(1)',
						}}
						variant="contained"
						color="info"
						onClick={() => toggleFilter('locations', 'beach')}
					>
						<Typography fontSize={24}>B</Typography>
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
							src="misc/net.webp"
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
