import express, { urlencoded } from 'express';
import cors from 'cors';
import router from './module/index.js';
import { conectarDB } from './config/db.js';

const PORT = process.env.PORT || 3010;
conectarDB();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(router);

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + PORT);
});

