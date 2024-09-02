import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/authRoutes';
import { useAppDispatch } from '../store';

import { readToken } from '../auth/features';
import { AppComponent } from '../app/components/app.component';

export const BlackstoneAppRouter = () => {
	const dispatch = useAppDispatch();
	dispatch(readToken());

	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />

			<Route path="/app/*" element={<AppComponent />} />
			<Route
				path="/*"
				element={<Navigate to="/app/dashboard"></Navigate>}
			/>
		</Routes>
	);
};
