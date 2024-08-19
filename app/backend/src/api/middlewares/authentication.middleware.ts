import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { validateToken } from '../../common/functions/jwt.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';

const getBearerAuthenticationToken = (req: Request): string => {
	let jwt = req.headers.authorization;
	if (!jwt) throw new createHttpError.Unauthorized('No valid token provided');

	// remove Bearer if using Bearer Authorization mechanism
	if (jwt.toLowerCase().startsWith('bearer'))
		jwt = jwt.slice('bearer'.length).trim();

	return jwt;
};

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const jwt = getBearerAuthenticationToken(req);
		await validateToken(jwt)
			.then((token) => {
				req.body.user = token.user;
			})
			.catch((error) => {
				if (error.name === 'TokenExpiredError')
					throw new createHttpError.Unauthorized('Token expired');

				console.error(error);
				throw new createHttpError.InternalServerError(
					'Authentication token failed'
				);
			});

		next();
	} catch (error) {
		handleRequestErrors(res, error);
	}
};
