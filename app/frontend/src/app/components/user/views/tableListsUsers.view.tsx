import { User } from '@blackstone-challenge/data-model/entities';
import {
	Grid,
	Hidden,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { TableItemUsersView } from '.';

export const TableListsUsersView = ({ users }: { users: User[] }) => {
	return (
		<Grid container>
			<TableContainer component={Paper}>
				<Table
					sx={{
						width: '100%',
						tableLayout: 'fixed',
						whiteSpace: 'nowrap',
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<Hidden mdDown>
								<TableCell>Username</TableCell>
							</Hidden>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableItemUsersView key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
