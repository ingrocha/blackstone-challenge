import { Box, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { NavBar, SideBar } from '../shared/components';

const drawerWidth = 240;

export const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<NavBar drawerWidth={drawerWidth}></NavBar>
			<SideBar drawerWidth={drawerWidth}></SideBar>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
