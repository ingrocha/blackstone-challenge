import { Note } from '@blackstone-challenge/data-model/entities';
import { NoteOuputDto } from '../dto/note.dto';

export const noteMapper = (note: NoteOuputDto): Note => {
	return {
		id: note._id.toString(),
		title: note.title,
		content: note.content,
		author: note.author,
		updatedBy: note.updatedBy,
		updateHistories: note.updateHistories,
		sharedUsers: note.sharedUsers,
		createdAt: note.createdAt,
		updatedAt: note.updatedAt,
	};
};
