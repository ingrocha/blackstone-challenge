import { AppLayout } from '../layout/app.layout';
import { AppRoutes } from '../routes/app.routes';

export const AppComponent = () => {
	return (
		<AppLayout>
			<AppRoutes />
		</AppLayout>
	);
};
