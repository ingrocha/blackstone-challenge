import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppRoutes } from '../app/routes/AppRoutes';

export const BlackstoneAppRouter = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />

			<Route path="/app/*" element={<AppRoutes />} />
			<Route path="/*" element={<Navigate to="/auth/login"></Navigate>} />
		</Routes>
	);
};
