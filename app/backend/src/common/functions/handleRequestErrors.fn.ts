import { Response } from 'express';

/**
 * The function `handleRequestErrors` takes a response object and an error object, sets the status code
 * of the response to the error's status code, and sends a JSON response with the error code and
 * message.
 * @param {Response} res - The `res` parameter in the `handleRequestErrors` function is typically a
 * response object that represents the HTTP response that will be sent back to the client. It is used
 * to set the status code and send a response body in case of an error occurring during the request
 * handling process.
 * @param error - The `error` parameter in the `handleRequestErrors` function is an object that
 * contains information about the error that occurred during the request handling process. It typically
 * includes properties such as `statusCode`, `status`, and `message` to provide details about the error
 * that can be sent back in the response to
 * @returns a response with the status code and error message provided in the `error` object.
 */
export const handleRequestErrors = (res: Response, error) => {
	return res
		.status(error.statusCode)
		.send({ code: error.status, message: error.message });
};
