import { User } from '@blackstone-challenge/data-model/entities';

export type UserInputDto = Partial<Omit<User, 'id | createdAt | updatedAt'>>;
export interface UserOuputDto extends Required<Omit<User, 'id'>> {
	_id: string;
}
