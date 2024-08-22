import request from 'supertest';
import app from '../../app';

import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import dbConnect, { dbDisconnect } from '../../db/config';
import { Note } from '@blackstone-challenge/data-model/entities';
import NoteModel from '../../db/models/note.model';

dotenv.config();
export const SECRET_KEY: Secret = process.env.TOKEN_SECRET_KEY;

// Generate a JWT token for testing
const token = jwt.sign({ name: 'John', username: 'testUserId' }, SECRET_KEY, {
	expiresIn: '1h',
});

describe('GET /api/v1/note', () => {
	beforeAll(async () => {
		await dbConnect();
	});

	afterAll(async () => {
		await NoteModel.collection.drop();
		await dbDisconnect();
	});

	let note: Note;

	it('should create a new note and return 200', async () => {
		const response = await request(app)
			.post('/api/v1/note')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Test Note',
				content: 'This is a test note',
				author: 'testUserId',
				sharedUsers: [],
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body).toHaveProperty('title', 'test note');
		expect(response.body).toHaveProperty('content', 'This is a test note');
		expect(response.body).toHaveProperty('author', 'testUserId');
		note = response.body;
	});
	it('should return all notes', async () => {
		const response = await request(app)
			.get(`/api/v1/note?username=testUserId`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body).toBeInstanceOf(Array);
	});

	it('should return notes filtered by searchTerm', async () => {
		const searchTerm = 'test';
		const response = await request(app)
			.get(`/api/v1/note?username=testUserId&searchTerm=${searchTerm}`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body).toBeInstanceOf(Array);
	});

	it('should return an error for unauthorized requests', async () => {
		const response = await request(app).get('/api/v1/note');

		expect(response.status).toBe(401);
	});

	// Add more test cases as needed
});
