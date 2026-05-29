import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
<<<<<<< HEAD
import cors from 'cors';
=======
import path from 'path';                          
import { fileURLToPath } from 'url';              

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);        
>>>>>>> development

const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(cors());
=======

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

>>>>>>> development
app.use('/', routes);

app.listen(process.env.SERVER_PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${process.env.SERVER_PORT}`);
});