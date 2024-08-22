import { LoginResponse } from '@blackstone-challenge/data-model/interfaces';
import dbConnect, { dbDisconnect } from '../../db/config';
import UserModel from '../../db/models/user.model';
import { UserInputDto } from '../user/dto/user.dto';
import * as userController from '../user/user.constroller';
import * as loginController from '../login/login.controller';

describe('Login tests', () => {
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
			username: 'john.doe',
			password: 'password123',
		};
		// Create a new user
		const userResponse = await userController.createUser(data);
		// Should have the same data
		// Exclude _id from the comparison
		expect(userResponse).toHaveProperty('id');
		expect(userResponse).toHaveProperty('name', 'John Doe');
		expect(userResponse).toHaveProperty('username', 'john.doe');
		expect(userResponse).not.toHaveProperty('password');
	});

	it('should get token', async () => {
		const loginResponse: LoginResponse = await loginController.checkLogin(
			'john.doe',
			'password123'
		);

		expect(loginResponse).toHaveProperty('token');
	});

	it('should not get token', async () => {
		try {
			await loginController.checkLogin('john.doe', 'wrongpassword');
		} catch (error) {
			expect(error.statusCode).toBe(401);
		}
	});
});
