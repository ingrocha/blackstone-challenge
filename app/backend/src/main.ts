import dotenv from 'dotenv';
import dbConnect from './db/config';
import app from './app';

import * as http from 'http';
import * as socketio from 'socket.io';
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

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new socketio.Server(server);

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(port, host, async () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
