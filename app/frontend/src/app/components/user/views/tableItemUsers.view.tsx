import { User } from '@blackstone-challenge/data-model/entities';
import { Button, Hidden, TableCell, TableRow } from '@mui/material';

export const TableItemUsersView = ({ user }: { user: User }) => {
	return (
		<TableRow>
			<TableCell component="th" scope="row">
				{user.name}
			</TableCell>
			<Hidden mdDown>
				<TableCell>{user.username}</TableCell>
			</Hidden>
			<TableCell>
				<Button color="primary" sx={{ padding: 2 }}>
					Edit
				</Button>
				<Button color="error" sx={{ padding: 2 }}>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};
