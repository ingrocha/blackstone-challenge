import { Route, Routes } from 'react-router-dom';
import { AddNoteComponent, ListNoteComponent } from '../components';

export const NoteRoutes = () => {
	return (
		<Routes>
			<Route path="list" element={<ListNoteComponent />} />
			<Route path="add" element={<AddNoteComponent />} />
		</Routes>
	);
};
