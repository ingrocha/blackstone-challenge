import { Routes, Route } from 'react-router-dom';
import { NoteRoutes } from '../components/note/routes/NoteRoutes';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/notes/*" element={<NoteRoutes />} />

			{/* <Route path="/users/*" element={<User />} /> */}
		</Routes>
	);
};
