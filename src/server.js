import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import path from 'path';                          
import { fileURLToPath } from 'url';              

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);      

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/', routes);

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});