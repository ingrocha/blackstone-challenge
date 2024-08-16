import dotenv from 'dotenv';
import express from 'express';

require('./db/config');

// load the environment variables from the .env file
dotenv.config({
	path: '.env',
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
	return res.status(200).send({
		message: `Welcome to the cookbook API! \n Endpoints available at http://${host}:${port}/api/v1`,
	});
});

app.listen(port, host, async () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
