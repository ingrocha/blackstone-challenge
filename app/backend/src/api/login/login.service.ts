import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserOuputDto } from '../user/dto/user.dto';

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
