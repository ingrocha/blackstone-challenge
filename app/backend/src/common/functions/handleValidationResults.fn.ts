import { Request } from 'express';
import { FieldValidationError, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

const errorFormatter = (error: FieldValidationError) => {
	// Build your resulting errors however you want! String, object, whatever - it works!
	return `${error.location}[${error.path}]: ${error.msg}`;
};

/**
 * The function `handleValidationResults` checks for validation errors in a request and throws a
 * BadRequest error if any errors are found.
 * @param {Request} req - The `req` parameter in the `handleValidationResults` function is of type
 * `Request`, which is likely an object representing an HTTP request in a Node.js application. This
 * object typically contains information about the incoming request such as headers, parameters, body,
 * etc.
 */
export const handleValidationResults = (req: Request) => {
	const validationError = validationResult(req).formatWith(errorFormatter);
	if (!validationError.isEmpty())
		throw new createHttpError.BadRequest(
			validationError.array({ onlyFirstError: true }).toString()
		);
};
