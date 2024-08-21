import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/authentication.middleware';
import * as noteController from './note.controller';
import { handleValidationResults } from '../../common/functions/handleValidationResults.fn';
import { body, param, query } from 'express-validator';
import { handleRequestErrors } from '../../common/functions/handleRequestErrors.fn';
import { Note, User } from '@blackstone-challenge/data-model/entities';
import { SharedUsersPermissions } from '@blackstone-challenge/data-model/enums';
import { plainToInstance } from 'class-transformer';

const noteRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UpdateHistory:
 *       type: object
 *       description: Store the history of chages to the note
 *       properties:
 *         updatedBy:
 *           type: string
 *           readOnly: true
 *           description: The last user that updated the note
 *           example: admin
 *         updatedAt:
 *           type: string
 *           readOnly: true
 *           format: date-time
 *           description: The date when the note was last updated.
 *           example: 2023-01-02T00:00:00.000Z
 *         content:
 *           type: string
 *           readOnly: true
 *           description: The content of the note
 *           example: this is just an example of a note content
 *     SharedUser:
 *       type: object
 *       description: Store the users and their permission for the shared notes
 *       properties:
 *         username:
 *           type: string
 *           description: The user that can access the notes
 *           example: admin
 *         permission:
 *           type: string
 *           enum: [edit, view]
 *           description: The permission updated or view the note.
 *           example: view
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *           readOnly: true
 *           example: d5fE_asz
 *         title:
 *           type: string
 *           description: The title of the note
 *           example: last note
 *         content:
 *           type: string
 *           description: The content of the note
 *           example: this is just an example of a note content
 *         author:
 *           type: string
 *           readOnly: true
 *           description: The username for the user who created the note
 *           example: admin
 *         updatedBy:
 *           type: string
 *           readOnly: true
 *           description: The username for the user who updated the note
 *           example: admin
 *         updateHistories:
 *           type: array
 *           readOnly: true
 *           description: Store the history of chages to the note
 *           items:
 *             $ref: '#/components/schemas/UpdateHistory'
 *         sharedUsers:
 *           type: array
 *           description: Store the users and their permission for the shared notes
 *           items:
 *             $ref: '#/components/schemas/SharedUser'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *           readOnly: true
 *           example: 2023-01-02T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *           readOnly: true
 *           example: 2023-01-02T00:00:00.000Z
 */

/**
 * @swagger
 * api/v1/note/sharedNotes?searchTerm=test:
 *   get:
 *     summary: Get the note that have been shared with the user
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         type: string
 *         description: The value used to search in the notes by title or content.
 *     responses:
 *       200:
 *         description: All the notes that have been shared with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Note'
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

noteRouter.get(
	'/sharedNotes',
	verifyToken,
	query('searchTerm').trim(),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { searchTerm } = req.query as {
				searchTerm: string;
			};
			const { user } = req.body as { user: User };
			console.warn('🐉 Charles ~ user:', user);
			const notes = await noteController.findSharedNotes(
				user.username,
				searchTerm
			);
			return res.send(notes);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

/**
 * @swagger
 * api/v1/note/{id}:
 *   get:
 *     summary: Get the note by id
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The note id
 *     responses:
 *       200:
 *         description: The note description by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Note'
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
noteRouter.get(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			const note = await noteController.findById(id);
			return res.send(note);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

/**
 * @swagger
 * api/v1/note?searchTerm=test:
 *   get:
 *     summary: Get the note the user is the author
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         type: string
 *         example: title
 *         description: The value used to search in the notes by title or content.
 *     responses:
 *       200:
 *         description: All the notes the user is the author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Note'
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

noteRouter.get(
	'/',
	verifyToken,
	query('searchTerm').trim(),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { searchTerm } = req.query as {
				searchTerm: string;
			};
			const { user } = req.body as { user: User };
			const notes = await noteController.findAll(
				user.username,
				searchTerm
			);
			return res.send(notes);
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

/**
 * @swagger
 * api/v1/note:
 *   post:
 *     summary: Create a new note
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Data for creating a new note
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - title
 *               - content
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note description by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Note'
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

noteRouter.post(
	'/',
	verifyToken,
	body('title').trim().toLowerCase().notEmpty().withMessage('is required'),
	body('content').notEmpty().withMessage('is required'),
	body('sharedUsers').isArray().withMessage('is not an array'),
	body('sharedUsers.*.username')
		.notEmpty()
		.withMessage('is required')
		.isString()
		.withMessage('is not a string value'),
	body('sharedUsers.*.permission')
		.isIn([SharedUsersPermissions.EDIT, SharedUsersPermissions.VIEW])
		.withMessage('is not a valid permission')
		.isString()
		.withMessage('is not a string value'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);

			const { user } = req.body as {
				user: User;
			};
			const noteInputDto = plainToInstance(Note, req.body, {
				excludeExtraneousValues: true,
			});
			delete noteInputDto.id;
			noteInputDto.author = user.username;
			const note = await noteController.createNote(noteInputDto);
			return res.send(note);
		} catch (error) {
			console.error(error);
			return handleRequestErrors(res, error);
		}
	}
);

/**
 * @swagger
 * api/v1/note/{id}:
 *   patch:
 *     summary: Update a note
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The note id
 *     requestBody:
 *       description: Data for updating a note
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the note
 *                 example: this is just an example of a note content
 *               sharedUsers:
 *                 type: array
 *                 description: Store the users and their permission for the shared notes
 *                 items:
 *                   $ref: '#/components/schemas/SharedUser'
 *     responses:
 *       200:
 *         description: The note description by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Note'
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
noteRouter.patch(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	body('title').trim().toLowerCase(),
	body('sharedUsers').isArray().withMessage('is not an array'),
	body('sharedUsers.*.username')
		.notEmpty()
		.withMessage('is required')
		.isString()
		.withMessage('is not a string value'),
	body('sharedUsers.*.permission')
		.isIn([SharedUsersPermissions.EDIT, SharedUsersPermissions.VIEW])
		.withMessage('is not a valid permission')
		.isString()
		.withMessage('is not a string value'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);

			const { id } = req.params;
			const { user } = req.body as {
				user: User;
			};
			const noteInputDto = plainToInstance(Note, req.body, {
				excludeExtraneousValues: true,
			});
			delete noteInputDto.id;
			noteInputDto.author = user.username;
			noteInputDto.updatedBy = user.name;
			const note = await noteController.updateNote(id, noteInputDto);
			return res.send(note);
		} catch (error) {
			console.error(error);
			return handleRequestErrors(res, error);
		}
	}
);

/**
 * @swagger
 * api/v1/note/{id}:
 *   delete:
 *     summary: Delete the note by id
 *     tags:
 *       - Note
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The note id
 *     responses:
 *       200:
 *         description: The note has been deleted successfully
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
noteRouter.delete(
	'/:id',
	verifyToken,
	param('id').isMongoId().withMessage('Not a valid MongoID'),
	async (req: Request, res: Response) => {
		try {
			handleValidationResults(req);
			const { id } = req.params;
			await noteController.removeNote(id);
			return res.send();
		} catch (error) {
			return handleRequestErrors(res, error);
		}
	}
);

export default noteRouter;
