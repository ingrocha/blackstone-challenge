import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import * as userController from './user.constroller';
import { handleValidationResults } from '../../common/handleValidationResults.fn';

const userRouter = Router();

userRouter.get(
	'/:id',
	param('id', 'Not a valid MongoID').isMongoId(),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const id = req.params.id;
			const user = await userController.findById(id);
			return user;
		} catch (error) {
			return res
				.status(error.statusCode)
				.send({ code: error.status, message: error.message });
		}
	}
);

export default userRouter;
