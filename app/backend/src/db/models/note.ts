import { SharedUsersPermissions } from '@blackstone-challenge/data-model/enums';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		sharedUsers: [
			{
				username: String,
				permissions: {
					type: String,
					default: SharedUsersPermissions.VIEW,
				},
			},
		],
	},
	{ timestamps: true }
);

const Note = model(`Note`, noteSchema);

export default Note;
