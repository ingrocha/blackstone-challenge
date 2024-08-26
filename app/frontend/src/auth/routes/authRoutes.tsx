import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginComponent, RegisterComponent } from '../components';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="login" element={<LoginComponent />} />
			<Route path="register" element={<RegisterComponent />} />

			<Route path="/*" element={<Navigate to="/auth/login"></Navigate>} />
		</Routes>
	);
};
