import { sign, verify, Algorithm, Secret } from 'jsonwebtoken';
import { User } from '@blackstone-challenge/data-model/entities';
import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY: Secret = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES;

interface jwtSignOptions {
	expiresIn?: string;
	algorithm?: Algorithm;
}

// Generate JWT token
export const genToken = (user: User): string => {
	const signOptions: jwtSignOptions = {
		expiresIn: TOKEN_EXPIRES,
	};

	// Generate JWT
	return sign({ user }, SECRET_KEY, signOptions);
};

interface TokenPayload {
	exp: number;
	user: User;
}
// Decode and verify the JWT token
export const validateToken = (token: string): Promise<TokenPayload> => {
	return new Promise((resolve, reject) => {
		verify(token, SECRET_KEY, (error, decoded) => {
			if (error) return reject(error);
			return resolve(decoded as TokenPayload);
		});
	});
};
