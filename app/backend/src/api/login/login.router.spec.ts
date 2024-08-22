import request from 'supertest';
import app from '../../app';
import dbConnect, { dbDisconnect } from '../../db/config';
import UserModel from '../../db/models/user.model';
import { UserInputDto } from '../user/dto/user.dto';
import { createUser } from '../user/user.constroller';

describe('POST /api/v1/login', () => {
	beforeAll(async () => {
		await dbConnect();
	});

	afterAll(async () => {
		await UserModel.collection.drop();
		await dbDisconnect();
	});

	it('should create a new user', async () => {
		const data: UserInputDto = {
			name: 'John Doe',
			username: 'admin',
			password: 'ThisJustT3st',
		};
		// Create a new user
		const userResponse = await createUser(data);
		// Should have the same data
		// Exclude _id from the comparison
		expect(userResponse).toHaveProperty('id');
		expect(userResponse).toHaveProperty('name', 'John Doe');
		expect(userResponse).toHaveProperty('username', 'admin');
		expect(userResponse).not.toHaveProperty('ThisJustT3st');
	});

	it('should return 200 and an authentication token when valid credentials are provided', async () => {
		const response = await request(app).post('/api/v1/login').send({
			username: 'admin',
			password: 'ThisJustT3st',
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
	});

	it('should return 400 when username is missing', async () => {
		const response = await request(app).post('/api/v1/login').send({
			password: 'ThisJustT3st',
		});

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('body[username]: is required');
	});

	it('should return 400 when password is missing', async () => {
		const response = await request(app).post('/api/v1/login').send({
			username: 'admin',
		});

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('body[password]: is required');
	});

	it('should return 401 when password is wrong', async () => {
		const response = await request(app).post('/api/v1/login').send({
			username: 'admin',
			password: 'ThisJustT3sT',
		});

		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe('Username or password is incorrect');
	});

	// Add more tests here based on your requirements
});
