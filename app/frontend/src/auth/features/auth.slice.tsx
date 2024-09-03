import { createSlice } from '@reduxjs/toolkit';
import { AuthStateInterface } from '../interfaces';
import { AuthStatesEnum } from '../../shared/enums';

import { toast } from 'sonner';
import { loginUserThunk } from '.';

const initialState: AuthStateInterface = {
	status: AuthStatesEnum.UNAUTHENTICATED,
	token: '',
	username: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		readToken: (state) => {
			if (!state.token || state.token === '') {
				const token = localStorage.getItem('token');
				if (token) {
					state.token = token;
					state.status = AuthStatesEnum.LOGGED_IN;
				}
			}
		},
		logout: (state) => {
			state.status = AuthStatesEnum.UNAUTHENTICATED;
			state.token = '';
			state.username = '';
			localStorage.removeItem('token');
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
				state.username = action.payload.username;
				localStorage.setItem('token', action.payload.token);
				toast.success('User logged in successfully.');
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
export const { readToken } = authSlice.actions;

export default authSlice.reducer;
