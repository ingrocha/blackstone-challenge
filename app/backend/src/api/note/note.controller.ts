import { Note } from '@blackstone-challenge/data-model/entities';
import { noteMapper } from './mapper/note.mapper';
import * as noteService from './note.service';
import { NoteInputDto } from './dto/note.dto';

export const findById = async (id: string): Promise<Note> => {
	return noteMapper(await noteService.findById(id));
};

export const findAll = async (
	username: string,
	searchTerm?: string
): Promise<Note[]> => {
	return (await noteService.findAll(username, searchTerm)).map(noteMapper);
};

export const findSharedNotes = async (
	username: string,
	searchTerm: string
): Promise<Note[]> => {
	return (await noteService.findSharedNotes(username, searchTerm)).map(
		noteMapper
	);
};

export const createNote = async (noteInputDto: NoteInputDto): Promise<Note> => {
	return noteMapper(await noteService.create(noteInputDto));
};

export const updateNote = async (
	id: string,
	noteInputDto: NoteInputDto
): Promise<Note> => {
	return noteMapper(await noteService.update(id, noteInputDto));
};

export const removeNote = async (id: string): Promise<void> => {
	return await noteService.remove(id);
};
