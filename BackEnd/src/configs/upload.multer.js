import multer from "multer"; // Manipular arquivos enviados
import path from 'path'; // Biblioteca que trabalha com caminhos
import crypto from 'crypto'; // Gera numeração decimal
import fs from 'fs'; // Biblioteca que cria arquivos, exclue, verifica

// Junção de pastas, pasta raiz e pasta uploads
const baseUploadDir = path.resolve(process.cwd(), 'uploads');

// Verifica se o diretorio existe, se caso não existir irá criar
const verificaDir = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

//
const createMulter = ({pasta, tiposPermitidos, tamanhoArquivo }) => {
    //Junção das pastas
    const pastaFinal = path.join(baseUploadDir, pasta);
    verificaDir(pastaFinal);
    const storage = multer.diskStorage({
        //Destino  pastaFinal
        destination: (req, file, cb) => {
            cb(null, pastaFinal);
        }, 
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex');// HEX pode ser dorgado por ID
            cb(null, `${hash}-${file.originalname}`);
        }
    });

    //Filtro
    const fileFilter = (req, file, cb) => {
        //Verificar se o "arquivo" é do tipo permitido
        if(!tiposPermitidos.includes(file.mimetype)) {
            return cb(new Error("Tipo de arquivo não permitido"));
        }
        cb(null, true);
    }
    return multer({
        storage,
        limits: { tamanhoArquivo },
        fileFilter
    })
}

export default createMulter;