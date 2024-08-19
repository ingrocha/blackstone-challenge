import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';
import * as loginController from './login.controller';

const loginRouter = Router();

loginRouter.post(
	'/',
	body('username')
		.notEmpty()
		.withMessage('is required')
		.isString()
		.toLowerCase()
		.trim(),
	body('password').notEmpty().withMessage('is required'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);

			const { username, password } = req.body;
			const token = await loginController.checkLogin(username, password);
			res.send(token);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

export default loginRouter;
