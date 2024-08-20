import { Router } from 'express';
import userRouter from './user/user.routes';
import loginRouter from './login/login.router';
import noteRouter from './note/note.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/note', noteRouter);

export default router;
