import mongoose, { Schema } from 'mongoose';
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Comment', commentSchema);
