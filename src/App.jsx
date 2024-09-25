// Components, Hooks, & Utils /////////////////////////////////////////////////
import { CustomThemeProvider } from './contexts/ThemeContext';
// import AuthProvider from './contexts/auth/AuthProvider';
import MainLayout from './routes/MainLayout';

// Main Component ////////////////////////////////////////////////////
function App() {
	// Render ////////////////////////////////////////////////////
	return (
		<CustomThemeProvider>
			<MainLayout />
		</CustomThemeProvider>
	);
}

export default App;
