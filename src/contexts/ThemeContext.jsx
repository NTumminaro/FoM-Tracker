// Libraries & Frameworks /////////////////////////////////////////////////
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
	createTheme,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

// Constants /////////////////////////////////////////////////
const colors = {
	primary: '#000538',
	secondary: '#3a49b2',
	lightColor: '#ffffff',
	darkColor: '#303030',
	sideBarHover: '#f4f6fa1a',
	sideBarTextColor: '#f4f6fa99',
	lightTableText: '#27313b',
	darkTableText: '#cccccc',
	dataGridHeader: '#9b3843',
	current: '#09ff0033',
	upcoming: '#ffff0033',
	editBorder: '#808080',
	editBorderHover: '#bebfc1',
	editing: '#275bb51f',
	headerLight: '#e0e0e0',
	headerDark: '#434343',
};

// Context /////////////////////////////////////////////////
const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

// useColorMode /////////////////////////////////////////////////
export const useColorMode = () => useContext(ColorModeContext);

// getDesignTokens /////////////////////////////////////////////////
const getDesignTokens = (mode) => ({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
			xxl: 1920,
		},
	},
	palette: {
		contrastThreshold: 3.7,
		mode,
		primary: {
			main: mode === 'light' ? colors.primary : colors.lightColor,
		},
		secondary: {
			main: colors.secondary,
		},
		background: {
			default: mode === 'light' ? colors.lightColor : colors.darkColor,
			paper: mode === 'light' ? colors.lightColor : colors.darkColor,
			header: mode === 'light' ? colors.headerLight : colors.headerDark,
			editing: colors.editing,
			appBar: colors.primary,
		},
		sideBarHover: colors.sideBarHover,
		sideBarTextColor: colors.sideBarTextColor,
		lightText: colors.lightColor,
		tableText: mode === 'light' ? colors.lightTableText : colors.darkTableText,
		dataGridHeader: colors.dataGridHeader,
		current: colors.current,
		upcoming: colors.upcoming,
		editBorder: colors.editBorder,
		editBorderHover: colors.editBorderHover,
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& input:-webkit-autofill': {
						WebkitBoxShadow: 'unset',
						WebkitBackgroundClip: 'border-box',
						transition: 'background-color 9999s ease-in-out 0s',
					},
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundImage: 'unset',
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					backgroundColor:
						mode === 'light' ? colors.headerLight : colors.headerDark,
				},
			},
		},
		// MuiCard: {
		// 	styleOverrides: {
		// 		root: {
		// 			backgroundImage: 'unset',
		// 		},
		// 	},
		// },
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: colors.secondary,
					color: colors.sideBarTextColor,
				},
			},
		},
		MuiListItem: {
			defaultProps: {
				disablePadding: true,
			},
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: colors.sideBarHover,
						color: colors.lightColor,
						boxShadow: `inset 3px 0 0 ${colors.lightText}`,
					},
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						boxShadow: `inset 3px 0 0 ${colors.lightColor}`,
						color: colors.lightColor,
						backgroundColor: colors.sideBarHover,
						'& .MuiListItemText-primary': {
							fontWeight: 'bold',
						},
						'&:hover': {
							backgroundColor: colors.sideBarHover,
						},
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: 'inherit',
					minWidth: 0,
					marginLeft: '12px',
					marginRight: '12px',
					'&.Mui-selected': {
						color: colors.lightColor,
					},
				},
			},
		},
	},
});

// CustomThemeProvider /////////////////////////////////////////////////
export const CustomThemeProvider = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const [mode, setMode] = useState(() => {
		const storedTheme = localStorage.getItem('themeMode');
		return storedTheme ? storedTheme : prefersDarkMode ? 'dark' : 'light';
	});

	useEffect(() => {
		// Store theme mode preference in localStorage whenever it changes
		localStorage.setItem('themeMode', mode);
	}, [mode]);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
			mode,
		}),
		[mode]
	);

	console.log(colorMode);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={'dark'}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ColorModeContext.Provider>
	);
};

// Prop Types /////////////////////////////////////////////////
if (!import.meta.env.PROD) {
	CustomThemeProvider.propTypes = {
		children: PropTypes.node,
	};
}
