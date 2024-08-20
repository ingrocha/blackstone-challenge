import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './db/config';
import routes from './api/index.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './documentation/swaggerConfig'; // Adjust the import path

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

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
	return res.status(200).send({
		message: `Welcome to the cookbook API! \n Endpoints available at http://${host}:${port}/api/v1`,
	});
});

app.use('/api/v1', routes);

app.listen(port, host, async () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
