import createMulter from "../configs/upload.multer.js";

const uploadImage = createMulter({
    pasta: 'imagens',
    tiposPermitidos: ['image/png', 'image/jpeg', 'image/jpg'],
    tamanhoArquivo: 10 * 1024 // tamanho: 10 MB
}).single('vinculoImg');

export default uploadImage;