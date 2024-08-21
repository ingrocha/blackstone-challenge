import {
	SharedUsers,
	UpdateHistory,
} from '@blackstone-challenge/data-model/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class Note {
	@Exclude()
	id = '';

	@Expose()
	title = '';

	@Expose()
	content = '';

	author = '';

	updatedBy = '';

	updateHistories: UpdateHistory[] = [];

	@Expose()
	sharedUsers: SharedUsers[] = [];

	createdAt?: Date;
	updatedAt?: Date;
}
