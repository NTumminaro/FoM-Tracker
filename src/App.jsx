// Libraries & Frameworks ////////////////////////////////////////////////////
import { SnackbarProvider } from 'notistack';

// Components, Hooks, & Utils /////////////////////////////////////////////////
import { CustomThemeProvider } from './contexts/ThemeContext';
// import AuthProvider from './contexts/auth/AuthProvider';
import MainLayout from './routes/MainLayout';

// Main Component ////////////////////////////////////////////////////
function App() {
	// Render ////////////////////////////////////////////////////
	return (
		<SnackbarProvider
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			maxSnack={5}
		>
			<CustomThemeProvider>
				<MainLayout />
			</CustomThemeProvider>
		</SnackbarProvider>
	);
}

export default App;
