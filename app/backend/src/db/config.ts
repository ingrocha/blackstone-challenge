import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_STRING;

// Function to establish a connection to the MongoDB database using Mongoose
const dbConnect = async () => {
	try {
		const db = await mongoose.connect(connectionString);
		console.log('Connected to ', db.connection.name);
	} catch (error) {
		console.error(error);
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

export default dbConnect;
