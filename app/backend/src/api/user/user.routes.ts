import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import * as userController from './user.constroller';

import { UserInputDto } from './dto/user.dto';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';
import { verifyToken } from '../middlewares/authentication.middleware';

const userRouter = Router();

/**
 * @swagger
 * components:

 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *           readOnly: true
 *           example: d5fE_asz
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: Admin
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: admin
 *         password:
 *           type: string
 *           writeOnly: true
 *           description: The password of the user. Must be at least 6 characters long and include at least 1 lowercase letter, 1 uppercase letter, and 1 number.
 *           example: ThisJustT3st
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: The date the user was created
 *           example: 2023-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: The date the user was last updated
 *           example: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found - Resource does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * api/v1/user:
 *   get:
 *     summary: Get all the user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get('/', verifyToken, async (req: Request, res: Response) => {
	try {
		handleValidationResults(req);
		const users = await userController.findAll();
		return res.send(users);
	} catch (error) {
		return handleRequestErrors(res, error);
	}
});

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       description: Data for creating a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found - Resource does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post(
	'/',
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

/**
 * @swagger
 * api/v1/user/{id}:
 *   patch:
 *     summary: Update a user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     requestBody:
 *       description: Data for updating a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found - Resource does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * api/v1/user/updatePassword/{id}:
 *   patch:
 *     summary: Update the user password
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     requestBody:
 *       description: Data for updating user password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "John Doe"
 *                 writeOnly: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found - Resource does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @swagger
 * api/v1/user/{id}:
 *   delete:
 *     summary: Delete the user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found - Resource does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
