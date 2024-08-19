import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserOuputDto } from './dto/user.dto';

export const userById = async (id: string): Promise<UserOuputDto> => {
	const user = await UserModel.findById<UserOuputDto>(id);

	if (!user)
		throw new createHttpError.NotFound(`The user id ${id} does not exist`);

	return user;
};
