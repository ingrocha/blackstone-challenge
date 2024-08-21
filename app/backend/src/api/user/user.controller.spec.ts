import * as userController from './user.constroller';

import UserModel from '../../db/models/user.model';
import { UserInputDto } from './dto/user.dto';
import dbConnect, { dbDisconnect } from '../../db/config';
import { User } from '@blackstone-challenge/data-model/entities';

let user: User;

describe('Users', () => {
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
		user = userResponse;
		// Should have the same data
		// Exclude _id from the comparison
		expect(userResponse).toHaveProperty('id');
		expect(userResponse).toHaveProperty('name', 'John Doe');
		expect(userResponse).toHaveProperty('username', 'john.doe');
		expect(userResponse).not.toHaveProperty('password');
	});

	it('should get all users', async () => {
		// Get all users
		const users = await userController.findAll();

		// Should be greater than 0
		// because we just created a user
		expect(users.length).toBeGreaterThan(0);
	});

	it('should get user by id', async () => {
		// Get user by id
		const userResponse = await userController.findById(user.id);

		// Should have the same data
		expect(userResponse).toHaveProperty('id', user.id);
		expect(userResponse).toHaveProperty('name', 'John Doe');
		expect(userResponse).toHaveProperty('username', 'john.doe');
		expect(userResponse).not.toHaveProperty('password');
	});

	it('should update user by id', async () => {
		// New data
		const data = {
			name: 'Mary Doe',
		};

		// Update user
		const userResponse = await userController.updateUser(user.id, data);

		// Should have the new data
		// Exclude _id from the comparison
		expect(userResponse).toHaveProperty('id', user.id);
		expect(userResponse).toHaveProperty('name', 'Mary Doe');
		expect(userResponse).toHaveProperty('username', 'john.doe');
		expect(userResponse).not.toHaveProperty('password');
	});

	it('should update user password by id', async () => {
		// New data
		const data = {
			password: 'Password321',
		};

		// Update user
		const userResponse = await userController.updatePassword(user.id, data);

		// Should have the new data
		// Exclude _id from the comparison
		expect(userResponse).toHaveProperty('id', user.id);
		expect(userResponse).toHaveProperty('name', 'Mary Doe');
		expect(userResponse).toHaveProperty('username', 'john.doe');
		expect(userResponse).not.toHaveProperty('password');
	});

	it('should delete user by id', async () => {
		// Get user by id
		const userResponse = await userController.removeUser(user.id);

		// Should be null
		expect(userResponse).toBeUndefined();
	});
});
