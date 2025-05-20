import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/Users.js';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    next();
};

export default adminMiddleware;
