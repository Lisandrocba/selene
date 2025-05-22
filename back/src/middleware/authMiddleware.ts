import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'; 
import Users from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config({path: '.env.example'});

const key = process.env.PRIVATE_KEY;

interface CustomJwtPayload extends JwtPayload {
    _id: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token,  key ? key : '') as JwtPayload | CustomJwtPayload;
        
        if (typeof decoded !== 'object' || !('_id' in decoded)) {
            return res.status(401).json({ message: 'Invalid token: Missing user ID' });
        }

        const user = await Users.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token: User not found' });
        }

        req.user = user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;

