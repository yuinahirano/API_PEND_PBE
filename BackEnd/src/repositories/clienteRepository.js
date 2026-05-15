import { connection } from "../configs/Database.js";

const clienteRepository = {

    criar: async (cliente, endereco, telefone) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCliente = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?);';
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);

            const sqlEndereco = 'INSERT INTO enderecos (idCliente,logradouro, numero, complemento, bairro, cidade, uf, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
            const valuesEndereco = [rowsCliente.insertId, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit()
            return { rowsCliente, rowsEndereco }
        } catch (error) {
            conn.rollback();
            throw error
        }
        finally {
            conn.release();
        }

    },
    atualizar: async (cliente, endereco) => {

        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCliente = 'UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?;';
            const valuesCliente = [cliente.nome, cliente.cpf, cliente.id];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);

            const sqlEndereco = 'UPDATE enderecos SET logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ?, cep = ? WHERE idCliente = ? ;';
            const valuesEndereco = [endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep, cliente.id];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit()
            return { rowsCliente, rowsEndereco }
        } catch (error) {
            conn.rollback();
            throw error
        }
        finally {
            conn.release();
        }

    },
    selecionar: async () => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const [rows] = await conn.execute
            //vai juntar todos
            (`
            SELECT 
                clientes.*, 
                enderecos.*
            FROM clientes   
            LEFT JOIN enderecos ON clientes.id = enderecos.idCliente
        `);

            await conn.commit();
            return rows;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            await conn.execute("DELETE FROM enderecos WHERE idCliente=?", [id]);
            await conn.execute("DELETE FROM clientes WHERE id=?", [id]);
            
            await conn.commit();
            return {message: "cliente deletado com sucesso"};

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

};

export default clienteRepository;