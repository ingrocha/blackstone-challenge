import { Navigate, Route, Routes } from 'react-router-dom';
import { NotePage } from '../pages/NotePage';

export const NoteRoutes = () => {
	return (
		<Routes>
			<Route path="notes" element={<NotePage />} />
			<Route path="/*" element={<Navigate to="/"></Navigate>} />
		</Routes>
	);
};
