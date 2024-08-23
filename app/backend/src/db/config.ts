import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDburi =
	process.env.MONGO_URL ||
	'mongodb://mongo:RlBRvijINzJvHJEpDKnQIbbkYGtdMYkx@autorack.proxy.rlwy.net:47144';
let mongoDbname = process.env.MONGO_DBNAME || 'backstone-challenge';

// Function to establish a connection to the MongoDB database using Mongoose
const dbConnect = async () => {
	try {
		if (process.env.NODE_ENV === 'test') mongoDbname += '-test';
		const db = await mongoose.connect(mongoDburi, {
			dbName: mongoDbname,
			autoCreate: true,
		});
		console.log('Connected to ', db.connection.name);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Event listener for when the Mongoose connection is successfully established
mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

// Event listener for when the Mongoose connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected');
});

export async function dbDisconnect() {
	try {
		await mongoose.connection.close();
	} catch (error) {
		console.log('DB disconnect error');
	}
}

export default dbConnect;
