import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import axiosInstance from '../../../shared/axios/axios';
import { UserFormFieldsInterface } from '../../interfaces';
import { User } from '@blackstone-challenge/data-model/entities';
import { authHeader } from '../../../shared/functions';

export const createUserThunk = createAsyncThunk(
	'user/create',
	async (data: UserFormFieldsInterface) => {
		try {
			const response = await axiosInstance.post<User>('user', data);
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
export const updateUserThunk = createAsyncThunk(
	'user/create',
	async (data: Omit<UserFormFieldsInterface, 'password' | 'username'>) => {
		try {
			const response = await axiosInstance.patch<User>('user', data, {
				headers: authHeader(),
			});
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
