import createHttpError from 'http-errors';
import NoteModel from '../../db/models/note.model';
import { NoteInputDto, NoteOuputDto } from './dto/note.dto';
import { handleMongooseExceptions } from '../../common/functions/handleMongooseExceptions.fn';
import { UpdateHistory } from '@blackstone-challenge/data-model/interfaces';

/**
 * Finds a note by its ID.
 * @param id - The ID of the note to find.
 * @returns A promise that resolves to the found NoteOuputDto.
 * @throws NotFound error if the note with the given ID does not exist.
 */
export const findById = async (id: string): Promise<NoteOuputDto> => {
	const note = await NoteModel.findById<NoteOuputDto>(id);

	if (!note)
		throw new createHttpError.NotFound(`The note id ${id} does not exist`);

	return note;
};

/**
 * Finds all notes for a given user, optionally filtered by a search term.
 * @param username - The username of the user whose notes to find.
 * @param searchTerm - An optional search term to filter the notes.
 * @returns A promise that resolves to an array of NoteOuputDto.
 */
export const findAll = async (
	username: string,
	searchTerm?: string
): Promise<NoteOuputDto[]> => {
	const queryParams = {};
	queryParams['author'] = username;
	if (searchTerm)
		queryParams['$or'] = [
			{ title: { $regex: '.*' + searchTerm + '.*' } },
			{ content: { $regex: '.*' + searchTerm + '.*' } },
		];
	const notes = await NoteModel.find<NoteOuputDto>(queryParams).sort({
		createdAt: -1,
	});
	return notes;
};

/**
 * Finds all shared notes for a given user, optionally filtered by a search term.
 * @param username - The username of the user whose shared notes to find.
 * @param searchTerm - An optional search term to filter the shared notes.
 * @returns A promise that resolves to an array of shared NoteOuputDto.
 */
export const findSharedNotes = async (
	username: string,
	searchTerm?: string
): Promise<NoteOuputDto[]> => {
	const queryParams = {};
	queryParams['sharedWith'] = username;
	if (searchTerm)
		queryParams['$or'] = [
			{ title: { $regex: '.*' + searchTerm + '.*' } },
			{ content: { $regex: '.*' + searchTerm + '.*' } },
		];
	const notes = await NoteModel.find<NoteOuputDto>(queryParams).sort({
		createdAt: -1,
	});
	return notes;
};

/**
 * Creates a new note.
 * @param noteInputDto - The data transfer object containing the note details.
 * @returns A promise that resolves to the created NoteOuputDto.
 */
export const create = async (
	noteInputDto: NoteInputDto
): Promise<NoteOuputDto> => {
	try {
		const note = new NoteModel(noteInputDto);
		return await note.save();
	} catch (error) {
		handleMongooseExceptions(error, 'Note');
	}
};

/**
 * Updates an existing note.
 * @param id - The ID of the note to update.
 * @param noteInputDto - The data transfer object containing the updated note details.
 * @returns A promise that resolves to the updated NoteOuputDto.
 */
export const update = async (
	id: string,
	noteInputDto: NoteInputDto
): Promise<NoteOuputDto> => {
	try {
		const note = await findById(id);

		const updateHistory: UpdateHistory = {
			content: note.content,
			updatedBy: note.updatedBy,
		};
		noteInputDto.updateHistories = note.updateHistories;
		noteInputDto.updateHistories.unshift(updateHistory);

		await note.updateOne(noteInputDto);

		return { ...note.toJSON(), ...noteInputDto };
	} catch (error) {
		handleMongooseExceptions(error, 'Note');
	}
};

/**
 * Removes a note by its ID.
 * @param id - The ID of the note to remove.
 * @returns A promise that resolves to void.
 * @throws NotFound error if the note with the given ID does not exist.
 */
export async function remove(id: string): Promise<void> {
	try {
		const { deletedCount } = await NoteModel.deleteOne({ _id: id });

		if (deletedCount === 0)
			throw new createHttpError.NotFound(
				`Note with id ${id} does not exist`
			);

		return;
	} catch (error) {
		handleMongooseExceptions(error, 'Note');
	}
}
