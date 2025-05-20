import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const key = process.env.PRIVATE_KEY;
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }
    try {
        const decoded = jwt.verify(token, key ? key : '');
        if (typeof decoded !== 'object' || !('_id' in decoded)) {
            return res.status(401).json({ message: 'Invalid token: Missing user ID' });
        }
        const user = await Users.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token: User not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export default authMiddleware;
