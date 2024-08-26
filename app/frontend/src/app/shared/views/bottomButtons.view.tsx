import { Button, Divider, Grid } from '@mui/material';
import { ButtonsActions } from '../enums';

interface BottomButtonsViewProps {
	onButtonClick: (data: ButtonsActions) => void;
}

export const BottomButtonsView = ({
	onButtonClick,
}: BottomButtonsViewProps) => {
	return (
		<Grid container direction="column">
			<Divider sx={{ width: '100%' }} />
			<Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
				<Grid item>
					<Button
						variant="outlined"
						sx={{ mr: 4 }}
						onClick={() => onButtonClick(ButtonsActions.CANCEL)}
					>
						Cancel
					</Button>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						variant="contained"
						sx={{ mr: 4 }}
						onClick={() => onButtonClick(ButtonsActions.SAVE)}
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
