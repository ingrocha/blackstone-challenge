import * as MuiIcons from '@mui/icons-material';
// import * as MuiIcons from '@material-ui/icons'
import {
	Box,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import { SideBarMenuInterface } from '../interfaces';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SideBar = ({ drawerWidth }: { drawerWidth: number }) => {
	const navigate = useNavigate();
	const sideBarMenu: SideBarMenuInterface[] = [
		{
			title: 'Users',
			route: '/app/users/list',
			icon: 'Person',
		},
		{
			title: 'Notes',
			route: '/app/notes/list',
			icon: 'Notes',
		},
	];

	const handlerSideBarItemClick = (route: string) => {
		return () => {
			navigate(route);
		};
	};

	return (
		<Box component="nav" sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Carlos Rocha
					</Typography>
				</Toolbar>
				<Divider />
				<List>
					{sideBarMenu.map((menu, index) => (
						<ListItem
							key={menu.title}
							disablePadding
							onClick={handlerSideBarItemClick(menu.route)}
						>
							<ListItemButton>
								<ListItemIcon>
									{React.createElement(
										MuiIcons[
											menu.icon as keyof typeof MuiIcons
										]
									)}
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={menu.title} />
								</Grid>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
