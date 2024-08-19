import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserInputDto, UserOuputDto } from './dto/user.dto';

const handleExceptions = (error) => {
	if (error.code === 11000) {
		throw new createHttpError.BadRequest(
			`User exists in db ${JSON.stringify(error.keyValue)}`
		);
	}
	console.log(error);
	throw new createHttpError.InternalServerError(
		`Can't create user - check servers logs`
	);
};

export const userById = async (id: string): Promise<UserOuputDto> => {
	const user = await UserModel.findById<UserOuputDto>(id);

	if (!user)
		throw new createHttpError.NotFound(`The user id ${id} does not exist`);

	return user;
};

export const createUser = async (user: UserInputDto): Promise<UserOuputDto> => {
	try {
		const userNewObject = new UserModel(user);
		return await userNewObject.save();
	} catch (error) {
		handleExceptions(error);
	}
};
