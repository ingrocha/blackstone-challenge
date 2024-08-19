import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '@blackstone-challenge/data-model/entities';

const { Schema, model } = mongoose;

const userSchema = new Schema<User>(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function comparePassword(password) {
	return await bcrypt.compare(password, this.password);
};

const UserModel = model(`User`, userSchema);

export default UserModel;
