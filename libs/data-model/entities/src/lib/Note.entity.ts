import { SharedUsers } from '@blackstone-challenge/data-model/interfaces';
import { Exclude, Expose } from 'class-transformer';

export class Note {
	@Exclude()
	id = '';

	@Expose()
	title = '';

	@Expose()
	content = '';

	author = '';

	@Expose()
	sharedUsers: SharedUsers[] = [];

	createdAt?: Date;
	updatedAt?: Date;
}
