import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { validateToken } from '../../common/functions/jwt.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';

/**
 * Extracts the Bearer token from the request's Authorization header.
 * @param req - The incoming HTTP request.
 * @returns The extracted JWT token as a string.
 * @throws Unauthorized error if no valid token is provided.
 */
const getBearerAuthenticationToken = (req: Request): string => {
	let jwt = req.headers.authorization;
	if (!jwt) throw new createHttpError.Unauthorized('No valid token provided');

	// Remove 'Bearer' if using Bearer Authorization mechanism
	if (jwt.toLowerCase().startsWith('bearer'))
		jwt = jwt.slice('bearer'.length).trim();

	return jwt;
};

/**
 * Middleware to verify the JWT token from the request's Authorization header.
 * @param req - The incoming HTTP request.
 * @param res - The HTTP response.
 * @param next - The next middleware function in the stack.
 */
export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Extract the JWT token from the request
		const jwt = getBearerAuthenticationToken(req);

		// Validate the extracted token
		await validateToken(jwt);

		// Proceed to the next middleware function
		next();
	} catch (error) {
		// Handle any errors that occur during token extraction or validation
		handleRequestErrors(res, error);
	}
};
