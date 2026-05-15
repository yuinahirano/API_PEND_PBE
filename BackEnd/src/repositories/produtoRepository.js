import { connection } from "../configs/Database.js";

const produtoRepository = {
    criar: async (produto) => {
        const sql = `
            INSERT INTO produtos
            (Nome, Preco, Id, vinculoImagem, idCategoria, qndEstoque)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        const values = [
            produto.nome,
            produto.preco,
            produto.id,
            produto.vinculoImagem,
            produto.idCategoria,
            produto.qtdEstoque
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    calcularEstoque: async (idProduto) => {
        const sql = `
        SELECT id, nome, qtdEstoque
        FROM produtos
        WHERE id = ?;
    `;
        const [rows] = await connection.execute(sql, [idProduto]);
        return rows[0];
    },

    editar: async (produto) => {
        const sql = `
            UPDATE produtos
            SET Nome = ?, preco = ?, vinculoImagem = ?, idCategoria = ?, qtdEstoque = ?
            WHERE id = ?;
        `;
        const values = [
            produto.nome,
            produto.preco,
            produto.vinculoImagem,
            produto.idCategoria,
            produto.qtdEstoque,
            produto.id
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    deletar: async (idProduto) => {
        const sql = 'DELETE FROM produtos WHERE IdProduto = ?;';
        const [rows] = await connection.execute(sql, [idProduto]);
        return rows;
    }
};

export default produtoRepository;