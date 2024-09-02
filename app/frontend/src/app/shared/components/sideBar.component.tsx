import { TurnedInNot } from '@mui/icons-material';
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

export const SideBar = ({ drawerWidth }: { drawerWidth: number }) => {
	const sideBarMenu: SideBarMenuInterface[] = [
		{
			title: 'Users',
			route: 'app/users/list',
		},
		{
			title: 'Notes',
			route: 'app/notes/list',
		},
	];

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
						<ListItem key={menu.title} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInNot />
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
