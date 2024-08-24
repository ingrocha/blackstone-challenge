import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { NoteRoutes } from '../note/routes/NoteRoutes';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />

			<Route path="/*" element={<NoteRoutes />} />
		</Routes>
	);
};
