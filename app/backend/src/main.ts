import dotenv from 'dotenv';
import dbConnect from './db/config';
import app from './app';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './documentation/swaggerConfig'; // Adjust the import path

// load the environment variables from the .env file
dotenv.config({
	path: '.env',
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

dbConnect();

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, host, async () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
