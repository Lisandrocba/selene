import Movie from '../models/Movie.js';
import Comment from '../models/Comment.js';
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Usuario no autenticado' });
            return;
        }
        const movie = await Movie.findById(id);
        if (!movie) {
            res.status(404).json({ message: 'Película no encontrada' });
            return;
        }
        const newComment = new Comment({
            comment,
            movieId: id,
            userId: req.user._id
        });
        const savedComment = await newComment.save();
        const populatedComment = await Comment.findById(savedComment._id)
            .populate('userId', 'username');
        res.status(201).json({
            message: 'Comentario agregado con éxito',
            comment: populatedComment
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar el comentario', error });
    }
};
