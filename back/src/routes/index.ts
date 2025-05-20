import { Request, Response, Router } from 'express';
import userRouter from './user.route.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import movieRouter from './movie.route.js';
import commentRouter from './comment.route.js';

const router = Router();

router.get('/', (req: Request, res: Response)=>{
    res.send('Hola mundo');
    router.use('/user', userRouter);
    router.use('/movie', authMiddleware, adminMiddleware, movieRouter);
    router.use('/comment',authMiddleware, commentRouter);
});

export default router;