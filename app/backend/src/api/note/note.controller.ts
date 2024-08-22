import { Note } from '@blackstone-challenge/data-model/entities';
import { noteMapper } from './mapper/note.mapper';
import * as noteService from './note.service';
import { NoteInputDto } from './dto/note.dto';

/**
 * Finds a note by its ID.
 * @param id - The ID of the note to find.
 * @returns A promise that resolves to the found Note entity.
 */
export const findById = async (id: string): Promise<Note> => {
	return noteMapper(await noteService.findById(id));
};

/**
 * Finds all notes for a given user, optionally filtered by a search term.
 * @param username - The username of the user whose notes to find.
 * @param searchTerm - An optional search term to filter the notes.
 * @returns A promise that resolves to an array of Note entities.
 */
export const findAll = async (
	username: string,
	searchTerm?: string
): Promise<Note[]> => {
	return (await noteService.findAll(username, searchTerm)).map(noteMapper);
};

/**
 * Finds all shared notes for a given user, optionally filtered by a search term.
 * @param username - The username of the user whose shared notes to find.
 * @param searchTerm - An optional search term to filter the shared notes.
 * @returns A promise that resolves to an array of shared Note entities.
 */
export const findSharedNotes = async (
	username: string,
	searchTerm: string
): Promise<Note[]> => {
	return (await noteService.findSharedNotes(username, searchTerm)).map(
		noteMapper
	);
};

/**
 * Creates a new note.
 * @param noteInputDto - The data transfer object containing the note details.
 * @returns A promise that resolves to the created Note entity.
 */
export const createNote = async (noteInputDto: NoteInputDto): Promise<Note> => {
	return noteMapper(await noteService.create(noteInputDto));
};

/**
 * Updates an existing note.
 * @param id - The ID of the note to update.
 * @param noteInputDto - The data transfer object containing the updated note details.
 * @returns A promise that resolves to the updated Note entity.
 */
export const updateNote = async (
	id: string,
	noteInputDto: NoteInputDto
): Promise<Note> => {
	return noteMapper(await noteService.update(id, noteInputDto));
};

/**
 * Removes a note by its ID.
 * @param id - The ID of the note to remove.
 * @returns A promise that resolves to void.
 */
export const removeNote = async (id: string): Promise<void> => {
	return await noteService.remove(id);
};
