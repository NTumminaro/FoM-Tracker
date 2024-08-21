import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from "@mui/material";

const ResizeHandle = () => (
	<Box
		sx={{
			position: 'absolute',
			bottom: 10,
			right: 10,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			cursor: 'se-resize',
			backgroundColor: 'secondary.main',
			padding: '2px',
		}}
	>
		<FilterListIcon sx={{ transform: 'rotate(-45deg)', fontSize: '16px' }} />
	</Box>
);

export default ResizeHandle;