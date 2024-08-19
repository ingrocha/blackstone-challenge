import { User } from '@blackstone-challenge/data-model/entities';
import * as userService from './user.service';
import { userMapper } from './mapper/user.mapper';
import { UserInputDto } from './dto/user.dto';

import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const comparePassword = async function comparePassword(password) {
	return await bcrypt.compare(password, this.password);
};

export const findById = async (id: string): Promise<User> => {
	return userMapper(await userService.userById(id));
};

export const createUser = async (user: UserInputDto): Promise<User> => {
	user.password = await encryptPassword(user.password);
	return userMapper(await userService.createUser(user));
};
