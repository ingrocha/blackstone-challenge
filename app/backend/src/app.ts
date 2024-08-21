import express, { Application } from 'express';
import routes from './api/index.routes';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.status(200).send({
		message: `Welcome to the cookbook API! \n Endpoints available at http://${host}:${port}/api/v1 \n Documentation available at http://${host}:${port}/api-docs`,
	});
});

app.use('/api/v1', routes);

export default app;
