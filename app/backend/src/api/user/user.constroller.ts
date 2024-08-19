import { User } from '@blackstone-challenge/data-model/entities';
import * as userService from './user.service';
import { userMapper } from './mapper/user.mapper';

export const findById = async (id: string): Promise<User> => {
	return userMapper(await userService.userById(id));
};
