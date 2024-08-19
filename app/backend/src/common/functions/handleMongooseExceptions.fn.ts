import createHttpError from 'http-errors';

export const handleMongooseExceptions = (error, model: string) => {
	if (error.code === 11000) {
		throw new createHttpError.BadRequest(
			`${model} exists in db ${JSON.stringify(error.keyValue)}`
		);
	}
	console.log(error);
	throw new createHttpError.InternalServerError(
		`Can't create user - check servers logs`
	);
};
