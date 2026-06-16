import 'dotenv/config';
import mysql from 'mysql2/promise';

class Database {
    static #instance = null;
    #pool = null;

    #createPool() {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    static getInstance() {
        if (!Database.#instance) {//Caso não tenha/ não tenha criado
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }
        return Database.#instance;
    }

    getPool() {
        return this.#pool;
    }
}

export const connection = Database.getInstance().getPool();


export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'api_pend_pbe';


        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS clientes(      
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
	cpf CHAR(11) NOT NULL UNIQUE, 
    telefone CHAR (11) NOT NULL,
    DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
        `);



        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS enderecos (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdCliente INT NOT NULL,
    Logradouro VARCHAR(100) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    Complemento VARCHAR(50),
    Bairro VARCHAR(50),
    Cidade VARCHAR(50) NOT NULL,
    UF CHAR(2) NOT NULL,
    CEP CHAR(8) NOT NULL,

    FOREIGN KEY (IdCliente) REFERENCES clientes(id)
);
        `);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS telefones (
    IdTelefone INT PRIMARY KEY AUTO_INCREMENT,
    IdCliente INT NOT NULL,
    Telefone CHAR(11) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES clientes(IdCliente)
);
        `);



        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(100)NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
        `);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCategoria INT NOT NULL,
    descricao VARCHAR(100) NULL, 
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    vinculoImagem VARCHAR(255),
    qtdEstoque DECIMAL(18,2) NOT NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);
        `);



        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS pedidos(
	Id INT AUTO_INCREMENT,
    idCliente INT NOT NULL,
    SubTotal DECIMAL(18,2) NOT NULL,
    Status ENUM("Aberto","Finalizado", "Pendente") NOT NULL,
    DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    
    
    PRIMARY KEY (Id, idCliente),
    
		CONSTRAINT FK_clientes_pedidos
        FOREIGN KEY (idCliente)
        REFERENCES clientes (Id)
);

        `);



        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS itens_pedidos(
	Id INT NOT NULL AUTO_INCREMENT,
    idPedido INT NOT NULL,
    idProduto INT NOT NULL,
    Quantidade DECIMAL(18,2) NOT NULL,
    ValorItem DECIMAL(18,2) NOT NULL,
    
    PRIMARY KEY (Id, idPedido, idProduto),
    
    CONSTRAINT FK_itens_pedidos_pedidos
		FOREIGN KEY (idPedido)
        REFERENCES pedidos (Id),
        
	CONSTRAINT FK_itens_pedidos_produtos
		FOREIGN KEY (idProduto)
        REFERENCES produtos (id)
);
        `);


        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}



