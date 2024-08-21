// Libraries & Frameworks /////////////////////////////////////////////////
import { useColorMode } from '../contexts/ThemeContext';
import { FormControlLabel, Switch } from '@mui/material';

// Main Component ////////////////////////////////////////////////////
const ThemeToggle = () => {
	// Hooks ////////////////////////////////////////////////////
	const { toggleColorMode, mode } = useColorMode();

	const isDarkMode = mode === 'dark';

	// Render ////////////////////////////////////////////////////
	return (
		<FormControlLabel
			sx={{ marginLeft: '0' }}
			control={
				<Switch color="info" onChange={toggleColorMode} checked={isDarkMode} />
			}
			label="Dark Mode"
			labelPlacement="start"
		/>
	);
};

export default ThemeToggle;
