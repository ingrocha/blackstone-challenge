import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserInputDto, UserOuputDto } from './dto/user.dto';
import { handleMongooseExceptions } from '../../common/functions/handleMongooseExceptions.fn';

export const findById = async (id: string): Promise<UserOuputDto> => {
	const user = await UserModel.findById<UserOuputDto>(id);

	if (!user)
		throw new createHttpError.NotFound(`The user id ${id} does not exist`);

	return user;
};

export const create = async (
	userInputDto: UserInputDto
): Promise<UserOuputDto> => {
	try {
		const user = new UserModel(userInputDto);
		return await user.save();
	} catch (error) {
		handleMongooseExceptions(error, 'User');
	}
};

export const update = async (
	id: string,
	userInputDto: UserInputDto
): Promise<UserOuputDto> => {
	try {
		const user = await findById(id);

		await user.updateOne(userInputDto);

		return { ...user.toJSON(), ...userInputDto };
	} catch (error) {
		handleMongooseExceptions(error, 'User');
	}
};
export async function remove(id: string): Promise<void> {
	try {
		const { deletedCount } = await UserModel.deleteOne({ _id: id });

		if (deletedCount === 0)
			throw new createHttpError.NotFound(
				`Pokemon with id ${id} does not exist`
			);

		return;
	} catch (error) {
		handleMongooseExceptions(error, 'User');
	}
}
