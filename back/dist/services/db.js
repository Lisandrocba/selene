import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.PASS_DB || '');
        console.log('DB conectada');
    }
    catch (e) {
        console.log('Error al conectar la base de datos', e);
        process.exit(1);
    }
};
