import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layout/authLayout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '../../store';
import { loginUserThunk } from '../features';

const schema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginFormFields = z.infer<typeof schema>;

export const LoginComponent = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormFields>({
		resolver: zodResolver(schema),
	});

	// const authStatus = useAppSelector((state) => state.authSlice.status);
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
		const response = await dispatch(loginUserThunk(data));
		if (response.payload) navigate('/app/dashboard');
	};

	return (
		<AuthLayout title="Login">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							label="Username"
							type="text"
							placeholder="Enter your username"
							{...register('username')}
							fullWidth
							error={!!errors.username}
							helperText={errors.username?.message}
						></TextField>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Password"
							type="password"
							placeholder="Enter your password"
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password?.message}
							fullWidth
						></TextField>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" fullWidth>
								{isSubmitting ? 'Logging in...' : 'Login'}
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
