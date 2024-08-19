import { Note } from '@blackstone-challenge/data-model/entities';
import { Document, ObjectId } from 'mongoose';

export type NoteInputDto = Partial<
	Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface NoteOuputDto extends Required<Omit<Note, 'id'>>, Document {
	_id: ObjectId;
}
