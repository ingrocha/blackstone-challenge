import { Router } from 'express';
import userRouter from './user/user.routes';
import loginRouter from './login/login.router';

const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;
