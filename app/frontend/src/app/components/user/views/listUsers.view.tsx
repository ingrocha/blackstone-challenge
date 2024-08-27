import { Button, Grid, TextField } from '@mui/material';
import { TopTitleView } from '../../../shared/views';
import { Person2Outlined, SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { User } from '@blackstone-challenge/data-model/entities';
import { TableListsUsersView } from './tableListsUsers.view';

export const ListUsersView = () => {
	const [searchTerms, setSearchTerms] = useState<string>('');

	const mockUsers: User[] = [
		{
			id: '1',
			name: 'User Name',
			username: 'username',
		},
		{
			id: '2',
			name: 'User Name',
			username: 'username',
		},
		{
			id: '3',
			name: 'User Name',
			username: 'username',
		},
		{
			id: '4',
			name: 'User Name',
			username: 'username',
		},
	];
	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignContent="center"
			sx={{ mb: 1 }}
		>
			<Grid container justifyContent="end" sx={{ mb: 7 }}>
				<TopTitleView title="List Users"></TopTitleView>
				<Button color="primary" variant="contained">
					<Person2Outlined sx={{ fontSize: 30, mb: 1 }} />
					New Note
				</Button>
			</Grid>
			<Grid container>
				<Grid item sm={11}>
					<TextField
						label="Search"
						variant="filled"
						onChange={(e) => setSearchTerms(e.target.value)}
						type="text"
						sx={{ border: 'none', mb: 2 }}
						fullWidth
					/>
				</Grid>
				<Grid item sm={1}>
					<Button>
						<SearchOutlined sx={{ fontSize: 35, mb: 1 }} />
						Search
					</Button>
				</Grid>
			</Grid>
			<TableListsUsersView users={mockUsers}></TableListsUsersView>
		</Grid>
	);
};
