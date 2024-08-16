import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_STRING;

mongoose
	.connect(connectionString)
	.then(() => {
		console.log('Database connection established');
	})
	.catch((error) => {
		console.error(error);
	});
