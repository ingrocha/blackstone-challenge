import { BlackstoneAppRouter } from './router/blackstoneAppRouter';
import { BlackstoneAppTheme } from './theme/blackstoneAppTheme';

export const BlackstoneApp = () => {
	return (
		<BlackstoneAppTheme>
			<BlackstoneAppRouter />
		</BlackstoneAppTheme>
	);
};
