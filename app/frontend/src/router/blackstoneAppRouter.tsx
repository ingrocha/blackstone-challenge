import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/authRoutes';
import { AppRoutes } from '../app/routes/appRoutes';

export const BlackstoneAppRouter = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />

			<Route path="/app/*" element={<AppRoutes />} />
			<Route path="/*" element={<Navigate to="/auth/login"></Navigate>} />
		</Routes>
	);
};
