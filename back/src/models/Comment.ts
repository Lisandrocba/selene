import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    comment: string;
    movieId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const commentSchema: Schema = new Schema({
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

export default mongoose.model<IComment>('Comment', commentSchema);