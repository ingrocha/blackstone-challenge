import { User } from '@blackstone-challenge/data-model/entities';
import * as userService from './user.service';
import { userMapper } from './mapper/user.mapper';
import { UserInputDto } from './dto/user.dto';

import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const findById = async (id: string): Promise<User> => {
	return userMapper(await userService.findById(id));
};

export const createUser = async (userInputDto: UserInputDto): Promise<User> => {
	userInputDto.password = await encryptPassword(userInputDto.password);
	return userMapper(await userService.create(userInputDto));
};

export const updateUser = async (
	id: string,
	userInputDto: UserInputDto
): Promise<User> => {
	return userMapper(await userService.update(id, userInputDto));
};

export const updatePassword = async (
	id: string,
	userInputDto: UserInputDto
): Promise<User> => {
	userInputDto.password = await encryptPassword(userInputDto.password);
	return userMapper(await userService.update(id, userInputDto));
};

export const removeUser = async (id: string): Promise<void> => {
	return await userService.remove(id);
};
