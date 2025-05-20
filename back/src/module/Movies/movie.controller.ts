import { Request, Response } from 'express';
import Movie from '../../models/Movie.js';
import Comment from '../../models/Comment.js';
import { IUser } from '../../models/Users.js';

interface AuthRequest extends Request {
  user?: IUser;
}

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
  }
};

export const createMovie = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    const { title, description, year } = req.body;
    
    const newMovie = new Movie({
      title,
      description,
      year,
      userId: req.user._id
    });

    const savedMovie = await newMovie.save();
    res.status(201).json({ message: 'Película creada con éxito', movie: savedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la película', error });
  }
};

export const updateMovie = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!req.user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: 'Película no encontrada' });
      return;
    }

    if (movie.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'No tienes permiso para editar esta película' });
      return;
    }

    const { title, description, year } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, description, year },
      { new: true }
    );

    res.status(200).json({ message: 'Película actualizada con éxito', movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película', error });
  }
};

export const deleteMovie = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!req.user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: 'Película no encontrada' });
      return;
    }

    if (movie.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'No tienes permiso para eliminar esta película' });
      return;
    }

    await Movie.findByIdAndDelete(id);
    await Comment.deleteMany({ movieId: id });

    res.status(200).json({ message: 'Película y comentarios eliminados con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: 'Película no encontrada' });
      return;
    }

    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la película', error });
  }
};

export const getMovieComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: 'Película no encontrada' });
      return;
    }

    const comments = await Comment.find({ movieId: id })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error });
  }
};