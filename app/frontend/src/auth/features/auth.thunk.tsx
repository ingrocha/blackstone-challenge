import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormFields } from '../components';
import axiosInstance from '../../shared/axios/axios';
import { AxiosError } from 'axios';
import { LoginResponse } from '@blackstone-challenge/data-model/interfaces';

export const loginUserThunk = createAsyncThunk(
	'auth/loginUser',
	async (data: LoginFormFields) => {
		try {
			const response = await axiosInstance.post<LoginResponse>(
				'login',
				data
			);
			return response.data;
		} catch (error) {
			const err = error as AxiosError;
			if (!err.response) {
				return Promise.reject({
					message: 'An error occurred. Please try again later.',
				});
			}
			return Promise.reject(err.response.data);
		}
	}
);
