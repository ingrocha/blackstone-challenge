import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './db/config';
import routes from './api/index.routes';
import userRouter from './api/user/user.routes';

// load the environment variables from the .env file
dotenv.config({
	path: '.env',
});

dbConnect();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.status(200).send({
		message: `Welcome to the cookbook API! \n Endpoints available at http://${host}:${port}/api/v1`,
	});
});

app.use('/api/v1', routes);

app.listen(port, host, async () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
