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
