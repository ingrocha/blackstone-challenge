import { Divider, Grid, Typography } from '@mui/material';

export const TopTitleView = ({ title }: { title: string }) => {
	return (
		<Grid container direction="column" sx={{ mb: 3 }}>
			<Grid item>
				<Typography variant="h4">{title}</Typography>
			</Grid>
			<Divider />
		</Grid>
	);
};
