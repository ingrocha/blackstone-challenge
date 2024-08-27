import { Routes, Route } from 'react-router-dom';
import { NoteRoutes } from '../components/note/routes/note.routes';
import { UserRoutes } from '../components/user/routers/user.routes';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/users/*" element={<UserRoutes />} />
			<Route path="/notes/*" element={<NoteRoutes />} />

			{/* <Route path="/users/*" element={<User />} /> */}
		</Routes>
	);
};
