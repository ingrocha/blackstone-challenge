import mongoose from 'mongoose';
import { NoteOuputDto } from '../../api/note/dto/note.dto';
import { SharedUsersPermissions } from '@blackstone-challenge/data-model/enums';

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
		updatedBy: String,
		updateHistory: [
			{
				updatedBy: String,
				updatedAt: { type: Date, default: Date.now },
				content: String,
			},
		],
		sharedUsers: [
			{
				username: { type: String },
				permission: {
					type: String,
					default: SharedUsersPermissions.VIEW,
				},
			},
		],
	},
	{ timestamps: true }
);
const NoteModel = model<NoteOuputDto>(`Note`, noteSchema);

export default NoteModel;
