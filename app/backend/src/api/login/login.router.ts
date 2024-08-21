import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';
import * as loginController from './login.controller';

const loginRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: admin
 *         password:
 *           type: string
 *           writeOnly: true
 *           description: The password of the user. Must be at least 6 characters long and include at least 1 lowercase letter, 1 uppercase letter, and 1 number.
 *           example: ThisJustT3st
 */

/**
 * @swagger
 * api/v1/login:
 *   post:
 *     summary: Login to the app
 *     tags:
 *       - Login
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Login to get the authentication token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Login'
 *     responses:
 *       200:
 *         description: Authentication token
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMmYwN2FiMDQzZTRhNGEwMjgwNWFhIiwibmFtZSI6IkNhcmxvcyBNYW51ZWwgUm9jaGEgUnVpeiIsInVzZXJuYW1lIjoiaW5ncm9jaGEiLCJjcmVhdGVkQXQiOiIyMDI0LTA4LTE5VDA3OjEyOjU4LjI3OFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA4LTE5VDA3OjEyOjU4LjI3OFoifSwiaWF0IjoxNzI0MDg2MDEzLCJleHAiOjE3MjQyNTg4MTN9.XiaSNsClmSjgV8l5YeuNZ4WttzOcrxxhmiooiTrJ_TI"
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
