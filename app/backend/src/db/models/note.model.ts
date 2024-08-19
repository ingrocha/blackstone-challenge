import { SharedUsersPermissions } from '@blackstone-challenge/data-model/enums';
import { SharedUsers } from '@blackstone-challenge/data-model/interfaces';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface NoteAttributes {
	id: string;
	title: string;
	content: string;
	author: string;
	sharedUsers: SharedUsers[];
	createdAt?: Date;
	updatedAt?: Date;
}

export type NoteInput = Partial<NoteAttributes>;
export type NoteOuput = Required<NoteAttributes>;

const noteSchema = new Schema<NoteAttributes>(
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
