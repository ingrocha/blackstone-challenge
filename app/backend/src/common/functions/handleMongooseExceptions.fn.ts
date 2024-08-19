import createHttpError from 'http-errors';

export const handleMongooseExceptions = (error, model: string) => {
	if (error.code === 11000) {
		const keyValue = JSON.stringify(error.keyValue);
		if (keyValue.includes('sharedUsers.username'))
			throw new createHttpError.BadRequest(
				`Duplicate user detected in sharedUsers. Each user can only be added once per note.`
			);
		else
			throw new createHttpError.BadRequest(
				`${model} exists in db ${JSON.stringify(error.keyValue)}`
			);
	}
	console.log(error);
	throw new createHttpError.InternalServerError(
		`Can't create user - check servers logs`
	);
};
