import { User } from '@blackstone-challenge/data-model/entities';
import { UserOuputDto } from '../dto/user.dto';

export const userMapper = (user: UserOuputDto): User => {
	return {
		id: user._id.toString(),
		name: user.name,
		username: user.username,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
