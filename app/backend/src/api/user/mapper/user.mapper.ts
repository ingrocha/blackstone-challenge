import { User } from '@blackstone-challenge/data-model/entities';
import { UserOuputDto } from '../dto/user.dto';

export const userMapper = (user: UserOuputDto): User => {
	return {
		id: user._id,
		name: user.name,
		username: user.username,
		createAt: user.createAt,
		updateAt: user.updateAt,
	};
};
