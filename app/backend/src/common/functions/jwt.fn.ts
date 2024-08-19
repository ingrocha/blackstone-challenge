import { sign, verify, Algorithm, Secret } from 'jsonwebtoken';
import { User } from '@blackstone-challenge/data-model/entities';

export const SECRET_KEY: Secret = process.env.TOKEN_SECRET_KEY;

interface jwtSignOptions {
	expiresIn?: string;
	algorithm?: Algorithm;
}

export const genToken = (user: User): string => {
	const signOptions: jwtSignOptions = {
		expiresIn: process.env.TOKEN_EXPIRES,
	};

	// generate JWT
	return sign({ user }, SECRET_KEY, signOptions);
};

interface TokenPayload {
	exp: number;
	User: User;
}

export const validateToken = (token: string): Promise<TokenPayload> => {
	return new Promise((resolve, reject) => {
		verify(token, SECRET_KEY, (error, decoded) => {
			if (error) return reject(error);
			return resolve(decoded as TokenPayload);
		});
	});
};
