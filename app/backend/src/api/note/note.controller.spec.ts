import { NoteInputDto } from './dto/note.dto';
import dbConnect, { dbDisconnect } from '../../db/config';
import NoteModel from '../../db/models/note.model';
import * as noteController from './note.controller';
import { Note } from '@blackstone-challenge/data-model/entities';

let note: Note;

describe('Notes', () => {
	beforeAll(async () => {
		await dbConnect();
	});

	afterAll(async () => {
		await NoteModel.collection.drop();
		await dbDisconnect();
	});
	it('should create a new note', async () => {
		const data: NoteInputDto = {
			title: 'John Doe',
			content: 'This is a note by John Doe',
			author: 'john.doe',
			sharedUsers: [],
		};

		const noteResponse = await noteController.createNote(data);

		expect(noteResponse).toHaveProperty('id');
		expect(noteResponse).toHaveProperty('title', 'John Doe');
		expect(noteResponse).toHaveProperty('author', 'john.doe');
		note = noteResponse;
	});

	it('should get all notes', async () => {
		const notesResponse = await noteController.findAll(
			'john.doe',
			'John Doe'
		);

		expect(notesResponse.length).toBeGreaterThan(0);
	});

	it('should get note by id', async () => {
		const noteResponse = await noteController.findById(note.id);

		expect(noteResponse).toHaveProperty('id', note.id);
		expect(noteResponse).toHaveProperty('title', 'John Doe');
		expect(noteResponse).toHaveProperty('author', 'john.doe');
	});

	it('should update note by id', async () => {
		const data = {
			title: 'Mary Doe',
		};

		const noteResponse = await noteController.updateNote(note.id, data);

		expect(noteResponse).toHaveProperty('id', note.id);
		expect(noteResponse).toHaveProperty('title', 'Mary Doe');
		expect(noteResponse).toHaveProperty('author', 'john.doe');
	});

	it('should delete note by id', async () => {
		const noteResponse = await noteController.removeNote(note.id);

		expect(noteResponse).toBeUndefined();
	});
});
