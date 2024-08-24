import { BlackstoneAppRouter } from './router/BlackstoneAppRouter';
import { BlackstoneAppTheme } from './theme/BlackstoneAppTheme';

export const BlackstoneApp = () => {
	return (
		<BlackstoneAppTheme>
			<BlackstoneAppRouter />
		</BlackstoneAppTheme>
	);
};
