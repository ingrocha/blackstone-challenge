import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config({
	path: '.env',
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

describe('Test app.ts', () => {
	test('Catch-all route', async () => {
		const res = await request(app).get('/');
		expect(res.body).toEqual({
			message: `Welcome to the cookbook API! \n Endpoints available at http://${host}:${port}/api/v1 \n Documentation available at http://${host}:${port}/api-docs`,
		});
	});
});
