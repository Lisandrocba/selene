import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    description: string;
    year: string;
    userId: mongoose.Types.ObjectId;
}

const movieSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

export default mongoose.model<IMovie>('Movie', movieSchema);