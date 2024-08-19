import { Request } from 'express';
import { FieldValidationError, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

const errorFormatter = (error: FieldValidationError) => {
	// Build your resulting errors however you want! String, object, whatever - it works!
	return `${error.location}[${error.path}]: ${error.msg}`;
};

export const handleValidationResults = (req: Request) => {
	const validationError = validationResult(req).formatWith(errorFormatter);
	if (!validationError.isEmpty())
		throw new createHttpError.BadRequest(
			validationError.array({ onlyFirstError: true }).toString()
		);
};
