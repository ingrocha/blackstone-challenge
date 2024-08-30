import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateInterface } from '../interfaces';
import { AuthStatesEnum } from '../../shared/enums';

import { toast } from 'sonner';
import { loginUserThunk } from '.';

const initialState: AuthStateInterface = {
	status: AuthStatesEnum.UNAUTHENTICATED,
	token: '',
	username: '',
	password: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ username: string; password: string }>
		) => {
			state.status = AuthStatesEnum.LOGGING_IN;
			state.username = action.payload.username;
			state.password = action.payload.password;
			console.log('Logging in...');
			// handle login logic here
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUserThunk.pending, (state) => {
			state.status = AuthStatesEnum.LOGGING_IN;
		});
		builder.addCase(loginUserThunk.fulfilled, (state, action) => {
			if (!action.payload) {
				state.status = AuthStatesEnum.ERROR;
			} else {
				state.status = AuthStatesEnum.LOGGED_IN;
				state.token = action.payload.token;
			}
		});
		builder.addCase(loginUserThunk.rejected, (state, action) => {
			state.status = AuthStatesEnum.ERROR;
			const error = action.error;
			toast.error(error.message);
		});
	},
});

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions;

export default authSlice.reducer;
