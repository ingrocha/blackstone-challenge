import * as loginService from './login.service';
import bcrypt from 'bcrypt';
import { UserOuputDto } from '../user/dto/user.dto';
import createHttpError from 'http-errors';
import { genToken } from '../../common/functions/jwt.fn';
import { userMapper } from '../user/mapper/user.mapper';
import { LoginResponse } from '@blackstone-challenge/data-model/interfaces';

/**
 * Compares the provided password with the hashed password stored in the user output DTO.
 * @param password - The plain text password provided by the user.
 * @param userOuputDto - The user output DTO containing the hashed password.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
const comparePassword = async function comparePassword(
	password: string,
	userOuputDto: UserOuputDto
): Promise<boolean> {
	return await bcrypt.compare(password, userOuputDto.password);
};

/**
 * Checks the login credentials of a user.
 * @param username - The username provided by the user.
 * @param password - The plain text password provided by the user.
 * @returns A promise that resolves to a LoginResponse containing a JWT token if the credentials are valid.
 * @throws Unauthorized error if the username or password is incorrect.
 */
export const checkLogin = async (
	username: string,
	password: string
): Promise<LoginResponse> => {
	const userOuputDto = await loginService.findByUsername(username);

	if (!(await comparePassword(password, userOuputDto)))
		throw new createHttpError.Unauthorized(
			'Username or password is incorrect'
		);

	const user = userMapper(userOuputDto);

	return { token: genToken(user) };
};
