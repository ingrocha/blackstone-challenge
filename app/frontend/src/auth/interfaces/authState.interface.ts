import { AuthStatesEnum } from '../../shared/enums';

export interface AuthStateInterface {
	status: AuthStatesEnum;
	username: string;
	token: string;
}
