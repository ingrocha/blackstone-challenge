import { Routes, Route } from 'react-router-dom';
import { NoteRoutes } from '../components/note/routes/note.routes';
import { UserRoutes } from '../components/user/routers/user.routes';
import { DashboardComponent } from '../components/dashboard/components';
import { useAppSelector } from '../../store';
import { ProtectedRoute } from './guard/protectedRoute.guard';

export const AppRoutes = () => {
	const token = useAppSelector((state) => state.authSlice.token);

	return (
		<Routes>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute token={token}>
						<DashboardComponent />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/users/*"
				element={
					<ProtectedRoute token={token}>
						<UserRoutes />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/notes/*"
				element={
					<ProtectedRoute token={token}>
						<NoteRoutes />
					</ProtectedRoute>
				}
			/>

			{/* <Route path="/users/*" element={<User />} /> */}
		</Routes>
	);
};
