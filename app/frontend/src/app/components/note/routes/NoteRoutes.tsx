import { Navigate, Route, Routes } from 'react-router-dom';
import { NotePage } from '../components/NotePage';

export const NoteRoutes = () => {
	return (
		<Routes>
			<Route path="notes" element={<NotePage />} />
			<Route path="/*" element={<Navigate to="/"></Navigate>} />
		</Routes>
	);
};
