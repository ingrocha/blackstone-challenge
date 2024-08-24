import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
	return (
		<AuthLayout title="Login">
			<form>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							label="User"
							type="text"
							placeholder="Enter your username"
							fullWidth
						></TextField>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Password"
							type="password"
							placeholder="Enter your password"
							fullWidth
						></TextField>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button variant="contained" fullWidth>
								Login
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link to="/auth/register" component={RouterLink}>
							<Typography variant="caption" color="inherit">
								Create Account
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
