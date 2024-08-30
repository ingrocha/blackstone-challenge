import { AuthStatesEnum } from '../../shared/enums';

export interface AuthStateInterface {
	status: AuthStatesEnum;
	username: string;
	password: string;
	token: string;
}
