import { User } from '@blackstone-challenge/data-model/entities';
import { Document, ObjectId } from 'mongoose';

export type UserInputDto = Partial<
	Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;
export interface UserOuputDto extends Required<Omit<User, 'id'>>, Document {
	_id: ObjectId;
}
