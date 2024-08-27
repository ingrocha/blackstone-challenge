import { User } from '@blackstone-challenge/data-model/entities';
import { Grid, TextField } from '@mui/material';
import { BottomButtonsView } from '../../../shared/views';
import { ButtonsActions } from '../../../shared/enums';

export const AddUsersFormView = ({ user }: { user: User }) => {
	const handleButtonClick = (data: ButtonsActions) => {
		if (data === ButtonsActions.SAVE) {
			console.log(user);
		}
		console.log(data);
	};
	return (
		<Grid container>
			<TextField
				type="text"
				label="Name"
				variant="filled"
				sx={{ border: 'none', mb: 2 }}
				required
				fullWidth
				defaultValue={user.name}
			/>
			<TextField
				type="text"
				label="Username"
				variant="filled"
				sx={{ border: 'none', mb: 2 }}
				fullWidth
				defaultValue={user.username}
				required
				InputProps={{
					readOnly: !!user.id,
				}}
			/>
			{!user.id && (
				<>
					<TextField
						type="text"
						label="Password"
						variant="filled"
						sx={{ border: 'none', mb: 2 }}
						fullWidth
						required
					/>
					<TextField
						type="text"
						label="Confirm Password"
						variant="filled"
						sx={{ border: 'none', mb: 2 }}
						fullWidth
						required
					/>
				</>
			)}
			<BottomButtonsView onButtonClick={handleButtonClick} />
		</Grid>
	);
};
