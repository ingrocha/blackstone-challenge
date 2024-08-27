import { Grid } from '@mui/material';
import { TopTitleView } from '../../../shared/views';
import { User } from '@blackstone-challenge/data-model/entities';
import { AddUsersFormView } from '.';

const mockUser: User = {
	id: '',
	name: 'User Name',
	username: 'username',
};

export const AddUsersView = () => {
	const title = mockUser.id ? 'Edit User' : 'Add User';

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignContent="center"
			sx={{ mb: 1 }}
		>
			<TopTitleView title={title}></TopTitleView>
			<AddUsersFormView user={mockUser}></AddUsersFormView>
		</Grid>
	);
};
