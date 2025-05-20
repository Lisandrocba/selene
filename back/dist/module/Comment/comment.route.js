import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import { addComment } from './comment.controller.js';
const router = Router();
router.post('/', authMiddleware, addComment);
export default router;
