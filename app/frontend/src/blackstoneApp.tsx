import { BlackstoneAppRouter } from './routes/blackstoneApp.routes';
import { BlackstoneAppTheme } from './theme/blackstoneAppTheme';

export const BlackstoneApp = () => {
	return (
		<BlackstoneAppTheme>
			<BlackstoneAppRouter />
		</BlackstoneAppTheme>
	);
};
