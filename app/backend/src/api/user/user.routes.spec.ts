import request from 'supertest';
import app from '../../app';
import dbConnect, { dbDisconnect } from '../../db/config';
import UserModel from '../../db/models/user.model';
import { User } from '@blackstone-challenge/data-model/entities';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const SECRET_KEY: Secret = process.env.TOKEN_SECRET_KEY;

// Generate a JWT token for testing
const token = jwt.sign({ username: 'testUserId' }, SECRET_KEY, {
	expiresIn: '1h',
});
describe('POST /user', () => {
	beforeAll(async () => {
		await dbConnect();
	});

	afterAll(async () => {
		await UserModel.collection.drop();
		await dbDisconnect();
	});

	let user: User;

	it('should create a new user and return 200', async () => {
		const response = await request(app)
			.post('/api/v1/user')
			.set('Authorization', `Bearer validToken`)
			.send({
				name: 'John Doe',
				username: 'johndoe',
				password: 'Password123',
			});
		user = response.body;
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body).toHaveProperty('name', 'John Doe');
		expect(response.body).toHaveProperty('username', 'johndoe');
	});

	// Example of accessing the token variable in another test case
	it('should get all users and return 200', async () => {
		const response = await request(app)
			.get('/api/v1/user')
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it('should get user by id and return 200', async () => {
		const response = await request(app)
			.get(`/api/v1/user/${user.id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id', user.id);
		expect(response.body).toHaveProperty('name', 'John Doe');
		expect(response.body).toHaveProperty('username', 'johndoe');
	});

	it('should update user by id and return 200', async () => {
		const response = await request(app)
			.patch(`/api/v1/user/${user.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Mary Doe',
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id', user.id);
		expect(response.body).toHaveProperty('name', 'Mary Doe');
		expect(response.body).toHaveProperty('username', 'johndoe');
	});

	it('should update user password by id and return 200', async () => {
		const response = await request(app)
			.patch(`/api/v1/user/updatePassword/${user.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				password: 'Password321',
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id', user.id);
		expect(response.body).toHaveProperty('name', 'Mary Doe');
		expect(response.body).toHaveProperty('username', 'johndoe');
	});

	it('should login with the updated password and return 200', async () => {
		const response = await request(app).post('/api/v1/login').send({
			username: 'johndoe',
			password: 'Password321',
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
	});

	it('should delete user by id and return 200', async () => {
		const response = await request(app)
			.delete(`/api/v1/user/${user.id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({});
	});
});
