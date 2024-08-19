import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import * as userController from './user.constroller';

import { UserInputDto } from './dto/user.dto';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';

const userRouter = Router();

userRouter.get(
	'/:id',
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const id = req.params.id;
			const user = await userController.findById(id);
			return res.send(user);
		} catch (error) {
			return res
				.status(error.statusCode)
				.send({ code: error.status, message: error.message });
		}
	}
);

userRouter.post(
	'/',
	body('name').notEmpty().withMessage('is required').trim(),
	body('username').notEmpty().withMessage('is required').toLowerCase().trim(),
	body('password').notEmpty().withMessage('is required'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const userInputData: UserInputDto = req.body;
			const user = await userController.createUser(userInputData);
			return res.send(user);
		} catch (error) {
			return res
				.status(error.statusCode)
				.send({ code: error.status, message: error.message });
		}
	}
);
export default userRouter;
