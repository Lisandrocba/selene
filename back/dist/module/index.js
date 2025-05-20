import { Router } from 'express';
import userRouter from './User/user.route.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import movieRouter from './Movies/movie.route.js';
import commentRouter from './Comment/comment.route.js';
const router = Router();
router.get('/', (req, res) => {
    res.send('Hola mundo');
    router.use('/user', userRouter);
    router.use('/movie', authMiddleware, adminMiddleware, movieRouter);
    router.use('/comment', authMiddleware, commentRouter);
});
export default router;
