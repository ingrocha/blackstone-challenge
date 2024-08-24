import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterComponent = () => {
	return (
		<AuthLayout title="Register">
			<form>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							label="Name"
							type="text"
							placeholder="Enter your name"
							fullWidth
						></TextField>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
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
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Confirm Password"
							type="password"
							placeholder="Confirm password"
							fullWidth
						></TextField>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button variant="contained" fullWidth>
								Create Account
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>
							Do you have an account?
						</Typography>
						<Link to="/auth/login" component={RouterLink}>
							<Typography variant="caption" color="inherit">
								Sign In
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
