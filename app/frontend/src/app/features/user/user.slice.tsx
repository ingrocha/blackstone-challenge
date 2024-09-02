import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { User } from '@blackstone-challenge/data-model/entities';
import { createUserThunk } from '.';

const initialState = {
	users: [] as User[],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createUserThunk.fulfilled, (state, action) => {
			if (!action.payload) {
				toast.error('An error occurred. Please try again later.');
			} else {
				state.users.push(action.payload);
				toast.success('User created successfully.');
			}
		});
	},
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
