import { SharedUsersPermissions } from '@blackstone-challenge/data-model/enums';

export interface SharedUsers {
	username: string;
	permissions: SharedUsersPermissions;
}
