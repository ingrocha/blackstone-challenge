import { Router } from 'express';
import userRouter from './user/user.routes';
import loginRouter from './login/login.router';
import noteRouter from './note/note.routes';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "body[password]: is required"
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to User
 */

router.use('/user', userRouter);

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: API endpoints related to Login
 */

router.use('/login', loginRouter);

/**
 * @swagger
 * tags:
 *   - name: Note
 *     description: API endpoints related to Note
 */

router.use('/note', noteRouter);

export default router;
