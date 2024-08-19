/* The User class in TypeScript defines properties for a user's name, username, password, creation
date, and update date. */
export class User {
	id = '';
	name = '';
	username = '';
	password? = '';
	createdAt?: Date;
	updatedAt?: Date;
}
