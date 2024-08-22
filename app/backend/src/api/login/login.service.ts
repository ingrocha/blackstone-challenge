import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserOuputDto } from '../user/dto/user.dto';

/**
 * Finds a user by their username.
 * @param username - The username to search for.
 * @returns A promise that resolves to a UserOuputDto if the user is found.
 * @throws Unauthorized error if the user is not found.
 */
export const findByUsername = async (
	username: string
): Promise<UserOuputDto> => {
	const user = await UserModel.findOne({ username });

	if (!user)
		throw new createHttpError.Unauthorized(
			`Username or password is incorrect`
		);

	return user;
};
