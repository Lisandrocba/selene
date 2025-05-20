import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const key = process.env.PRIVATE_KEY;
export const createToken = (objeto) => {
    return jwt.sign(objeto, key ? key : '', { expiresIn: '400h' });
};
