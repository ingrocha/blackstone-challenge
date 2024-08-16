import { SharedUsers } from '@blackstone-challenge/data-model/interfaces';

export class Note {
	title = '';
	content = '';
	author = '';
	sharedUsers: SharedUsers[] = [];
}
