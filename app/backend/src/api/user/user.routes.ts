import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import * as userController from './user.constroller';

import { UserInputDto } from './dto/user.dto';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';
import { verifyToken } from '../middlewares/authentication.middleware';

const userRouter = Router();

userRouter.get(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			const user = await userController.findById(id);
			return res.send(user);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

userRouter.get('/', verifyToken, async (req: Request, res: Response) => {
	try {
		handleValidationResults(req);
		const users = await userController.findAll();
		return res.send(users);
	} catch (error) {
		return handleRequestErrors(res, error);
	}
});

userRouter.post(
	'/',
	verifyToken,
	body('name').trim().notEmpty().withMessage('is required'),
	body('username').trim().notEmpty().withMessage('is required').toLowerCase(),
	body('password')
		.notEmpty()
		.withMessage('is required')
		.isStrongPassword({ minLength: 6, minSymbols: 0 })
		.withMessage(
			'must be at least 6 characters long and include at least 1 lowercase letter, 1 uppercase letter, and 1 number.'
		),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const userInputDto: UserInputDto = req.body;
			const user = await userController.createUser(userInputDto);
			return res.send(user);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

userRouter.patch(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	body('name').trim(),
	body('username')
		.not()
		.exists()
		.withMessage('The request body must not include this field.'),
	body('password')
		.not()
		.exists()
		.withMessage('The request body must not include this field.'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			const userInputDto: UserInputDto = req.body;
			const user = await userController.updateUser(id, userInputDto);
			return res.send(user);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

userRouter.patch(
	'/updatePassword/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	body('password')
		.notEmpty()
		.withMessage('is required')
		.isStrongPassword({ minLength: 6, minSymbols: 0 })
		.withMessage(
			'must be at least 6 characters long and include at least 1 lowercase letter, 1 uppercase letter, and 1 number.'
		),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			const { password } = req.body;
			const user = await userController.updateUser(id, { password });
			return res.send(user);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

userRouter.delete(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			await userController.removeUser(id);
			return res.send();
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);
export default userRouter;
