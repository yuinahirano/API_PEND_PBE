import { connection } from "../configs/Database.js";

const pedidoRepository = {

    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlPedido = 'INSERT INTO pedidos (idCliente, SubTotal, Status) VALUES (?, ?, ?);';
            const valuesPedido = [pedido.idCliente, pedido.subTotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            for (const item of itens) {
                const sqlItens = 'INSERT INTO itens_pedidos (idPedido, idProduto, Quantidade, ValorItem) VALUES (?, ?, ?, ?);';
                const valuesItens = [rowsPedido.insertId, item.idProduto, item.quantidade, item.valorItem];
                await conn.execute(sqlItens, valuesItens);
            }

            await conn.commit();
            return { rowsPedido };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    atualizarStatus: async (idPedido, novoStatus) => {
        const sql = 'UPDATE pedidos SET Status = ? WHERE Id = ?;';
        const [rows] = await connection.execute(sql, [novoStatus, idPedido]);
        return rows;
    },

    selecionar: async () => {
        const sql = `
            SELECT 
                p.Id  AS idPedido, p.idCliente, p.SubTotal, p.Status,ip.Id   AS itemId, ip.idProduto, ip.Quantidade, ip.ValorItem
            FROM pedidos p
            LEFT JOIN itens_pedidos ip ON p.Id = ip.idPedido
            ORDER BY p.Id;
        `;
        const [rows] = await connection.execute(sql);
        return rows;
    },

    adicionarItem: async (item) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlInsert = `
                INSERT INTO itens_pedidos (idPedido, idProduto, Quantidade, ValorItem)
                VALUES (?, ?, ?, ?);
            `;
            const [rowsItem] = await conn.execute(sqlInsert, [
                item.idPedido,
                item.idProduto,
                item.quantidade,
                item.valorItem
            ]);

            const [rowsSubTotal] = await conn.execute(
                'SELECT SUM(Quantidade * ValorItem) AS total FROM itens_pedidos WHERE idPedido = ?;', [item.idPedido]// calculo para retornar o total do pedido.
            );
            const novoSubTotal = rowsSubTotal[0].total || 0;

            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [novoSubTotal, item.idPedido]
            );

            await conn.commit();
            return { rowsItem, novoSubTotal };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },


    editarItem: async (itemId, idPedido, quantidade) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const [rowsUpdate] = await conn.execute(
                'UPDATE itens_pedidos SET Quantidade = ? WHERE Id = ? AND idPedido = ?;',
                [quantidade, itemId, idPedido]
            );

            if (rowsUpdate.affectedRows === 0) {
                throw new Error('Item não encontrado para este pedido');
            }

            const [rowsSubTotal] = await conn.execute(
                'SELECT SUM(Quantidade * ValorItem) AS total FROM itens_pedidos WHERE idPedido = ?;',
                [idPedido]
            );

            const novoSubTotal = rowsSubTotal[0].total || 0;

            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [novoSubTotal, idPedido]
            );

            await conn.commit();
            return { rowsUpdate, novoSubTotal };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    excluirItem: async (itemId, idPedido) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const [rowsDelete] = await conn.execute(
                'DELETE FROM itens_pedidos WHERE Id = ? AND idPedido = ?;',
                [itemId, idPedido]
            );

            // se não encontrou o item, lança erro
            if (rowsDelete.affectedRows === 0) {
                throw new Error('Item não encontrado para este pedido');
            }

            // rcalcula o subtotal do pedido
            const [rowsSubTotal] = await conn.execute(
                'SELECT SUM(Quantidade * ValorItem) AS total FROM itens_pedidos WHERE idPedido = ?;',
                [idPedido]
            );

            // se não houver itens, sum retorna null, então vira 0
            const novoSubTotal = rowsSubTotal[0].total || 0;

            // atualiza o subtotal do pedido
            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [novoSubTotal, idPedido]
            );

            await conn.commit();
            return { rowsDelete, novoSubTotal };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;