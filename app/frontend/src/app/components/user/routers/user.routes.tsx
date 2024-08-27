import { Routes, Route } from 'react-router-dom';

import { AddUsersComponent, ListUsersComponent } from '../components';

export const UserRoutes = () => {
	return (
		<Routes>
			<Route path="list" element={<ListUsersComponent />} />
			<Route path="add" element={<AddUsersComponent />} />
		</Routes>
	);
};
