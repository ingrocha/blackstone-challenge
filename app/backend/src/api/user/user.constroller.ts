import { User } from '@blackstone-challenge/data-model/entities';
import * as userService from './user.service';
import { userMapper } from './mapper/user.mapper';
import { UserInputDto } from './dto/user.dto';

import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns A promise that resolves to the found user.
 */
export const findById = async (id: string): Promise<User> => {
	return userMapper(await userService.findById(id));
};

/**
 * Retrieves all users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const findAll = async (): Promise<User[]> => {
	return (await userService.findAll()).map(userMapper);
};

/**
 * Creates a new user.
 *
 * @param userInputDto - The user input data.
 * @returns A promise that resolves to the created user.
 */
export const createUser = async (userInputDto: UserInputDto): Promise<User> => {
	userInputDto.password = await encryptPassword(userInputDto.password);
	return userMapper(await userService.create(userInputDto));
};

/**
 * Updates a user by their ID.
 *
 * @param id - The ID of the user to update.
 * @param userInputDto - The updated user input data.
 * @returns A promise that resolves to the updated user.
 */
export const updateUser = async (
	id: string,
	userInputDto: UserInputDto
): Promise<User> => {
	return userMapper(await userService.update(id, userInputDto));
};

/**
 * Updates the password of a user by their ID.
 *
 * @param id - The ID of the user to update the password for.
 * @param userInputDto - The updated user input data containing the new password.
 * @returns A promise that resolves to the updated user.
 */
export const updatePassword = async (
	id: string,
	userInputDto: UserInputDto
): Promise<User> => {
	userInputDto.password = await encryptPassword(userInputDto.password);
	return userMapper(await userService.update(id, userInputDto));
};

/**
 * Removes a user by their ID.
 *
 * @param id - The ID of the user to remove.
 * @returns A promise that resolves when the user is successfully removed.
 */
export const removeUser = async (id: string): Promise<void> => {
	await userService.remove(id);
};
