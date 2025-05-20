import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createMovie, deleteMovie, getAllMovies, getMovieById, getMovieComments, updateMovie } from '../controllers/movie.controller.js';

const router = Router();

router.get('/',authMiddleware , getAllMovies);
router.get('/:id',authMiddleware, getMovieById);
router.get('/commentInMovie/:id',authMiddleware, getMovieComments);
router.post('/',authMiddleware, createMovie);
router.put('/:id',authMiddleware, updateMovie);
router.delete('/:id',authMiddleware, deleteMovie);

export default router;