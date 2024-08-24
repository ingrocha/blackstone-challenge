import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import purpleTheme from './purpleTheme';

export const BlackstoneAppTheme = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<ThemeProvider theme={purpleTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
