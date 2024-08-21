import createHttpError from 'http-errors';
import UserModel from '../../db/models/user.model';
import { UserInputDto, UserOuputDto } from './dto/user.dto';
import { handleMongooseExceptions } from '../../common/functions/handleMongooseExceptions.fn';

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns A promise that resolves to the found user.
 * @throws {createHttpError.NotFound} If the user with the given ID does not exist.
 */
export const findById = async (id: string): Promise<UserOuputDto> => {
	const user = await UserModel.findById<UserOuputDto>(id);

	if (!user)
		throw new createHttpError.NotFound(`The user id ${id} does not exist`);

	return user;
};

/**
 * Retrieves all users from the database.
 * @returns {Promise<UserOuputDto[]>} A promise that resolves to an array of UserOuputDto objects representing the users.
 */
export const findAll = async (): Promise<UserOuputDto[]> => {
	try {
		const users: UserOuputDto[] = await UserModel.find();
		return users;
	} catch (error) {
		throw new createHttpError.InternalServerError('Error fetching users');
	}
};

/**
 * Creates a new user.
 *
 * @param userInputDto - The user input data.
 * @returns A promise that resolves to the created user.
 * @throws {Error} If there is an error while saving the user.
 */
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

/**
 * Updates a user with the provided ID using the given user input data.
 *
 * @param id - The ID of the user to update.
 * @param userInputDto - The data to update the user with.
 * @returns A promise that resolves to the updated user data.
 * @throws {Error} If there is an error updating the user.
 */
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

/**
 * Removes a user by their ID.
 *
 * @param id - The ID of the user to be removed.
 * @returns A promise that resolves to void.
 * @throws {createHttpError.NotFound} If the user with the given ID does not exist.
 */
export async function remove(id: string): Promise<void> {
	try {
		const { deletedCount } = await UserModel.deleteOne({ _id: id });

		if (deletedCount === 0)
			throw new createHttpError.NotFound(
				`User with id ${id} does not exist`
			);

		return;
	} catch (error) {
		handleMongooseExceptions(error, 'User');
	}
}
