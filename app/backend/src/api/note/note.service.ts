import createHttpError from 'http-errors';
import NoteModel from '../../db/models/note.model';
import { NoteInputDto, NoteOuputDto } from './dto/note.dto';
import { handleMongooseExceptions } from '../../common/functions/handleMongooseExceptions.fn';
import { UpdateHistory } from '@blackstone-challenge/data-model/interfaces';

export const findById = async (id: string): Promise<NoteOuputDto> => {
	const note = await NoteModel.findById<NoteOuputDto>(id);

	if (!note)
		throw new createHttpError.NotFound(`The note id ${id} does not exist`);

	return note;
};

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

export const findSharedNotes = async (
	username: string,
	searchTerm?: string
): Promise<NoteOuputDto[]> => {
	const queryParams = {};
	queryParams['sharedUsers.username'] = username;
	if (searchTerm)
		queryParams['$or'] = [
			{ title: { $regex: '.*' + searchTerm + '.*' } },
			{ content: { $regex: '.*' + searchTerm + '.*' } },
		];
	const sharedNotes: NoteOuputDto[] = await NoteModel.find(queryParams).sort({
		createdAt: -1,
	});

	return sharedNotes;
};

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
