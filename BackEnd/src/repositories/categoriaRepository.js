import { connection } from "../configs/Database.js";
const categoriaRepository = {
    criar: async(categoria)=>{
        const sql= 'INSERT INTO categorias (Nome, Descricao) VALUES(?,?);';
        const values= [categoria.nome, categoria.descricao];
        const[rows] = await connection.execute(sql, values);
        return rows;
    },
    editar: async(categoria)=>{
        const sql= 'UPDATE categorias SET Nome=?, Descricao=? WHERE Id = ?;';
        const values= [categoria.nome, categoria.descricao, categoria.id];
        const[rows] = await connection.execute(sql, values);
        return rows;
    },
    deletar: async(id)=>{
        const sql= 'DELETE FROM categorias WHERE Id = ?;';
        const values= [id];
        const[rows] = await connection.execute(sql, values);
        return rows;
    },
    buscarPorId: async () => {
        const sql = 'SELECT * FROM categorias WHERE id = ?;';
        const [rows] = await connection.execute(sql, [id]);
        return rows[0];
    },
    selecionar: async()=>{
        const sql= 'SELECT * FROM categorias;';
        const[rows] = await connection.execute(sql);
        return rows;
    }
}
export default categoriaRepository;