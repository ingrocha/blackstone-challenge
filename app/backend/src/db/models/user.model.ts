import mongoose from 'mongoose';

import { UserOuputDto } from '../../api/user/dto/user.dto';

const { Schema, model } = mongoose;

const userSchema = new Schema(
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

const UserModel = model<UserOuputDto>(`User`, userSchema);

export default UserModel;
