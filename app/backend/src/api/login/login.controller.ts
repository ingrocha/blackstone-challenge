import * as loginService from './login.service';

import bcrypt from 'bcrypt';
import { UserOuputDto } from '../user/dto/user.dto';
import createHttpError from 'http-errors';
import { genToken } from '../../common/functions/jwt.fn';
import { userMapper } from '../user/mapper/user.mapper';
import { LoginResponse } from '@blackstone-challenge/data-model/interfaces';

const comparePassword = async function comparePassword(
	password,
	userOuputDto: UserOuputDto
) {
	return await bcrypt.compare(password, userOuputDto.password);
};

export const checkLogin = async (
	username: string,
	password: string
): Promise<LoginResponse> => {
	const userOuputDto = await loginService.findByUsername(username);

	if (!comparePassword(password, userOuputDto))
		throw new createHttpError.Unauthorized(
			'Username or password is incorrect'
		);

	const user = userMapper(userOuputDto);

	return { token: genToken(user) };
};
