export class Pedido {

    // atributos privados da classe
    #id;
    #idCliente;
    #subTotal;
    #status;
    #dataCad;

    // construtor responsável por inicializar o pedido
    constructor(idCliente, subTotal, status, id) {
        this.id = id;
        this.idCliente = idCliente;
        this.subTotal = subTotal;
        this.status = status;
    }

    // getters para acessar os atributos privados
    get id() { return this.#id; }
    get idCliente() { return this.#idCliente; }
    get subTotal() { return this.#subTotal; }
    get status() { return this.#status; }

    // setters para validar e definir valores

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    set subTotal(value) {
        this.#validarSubTotal(value);
        this.#subTotal = value;
    }

    set status(value) {
        // valida se o status foi informado
        if (!value) {
            throw new Error('status é obrigatório');
        }

        this.#status = value;
    }

    // valida se o id é válido
    #validarId(value) {
        if (value != null && value <= 0) {
            throw new Error('verifique o id informado');
        }
    }

    // valida se o id do cliente é válido
    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('idcliente é obrigatório e deve ser maior que zero');
        }
    }

    // valida se o subtotal é válido
    #validarSubTotal(value) {
        if (value == null || value <= 0) {
            throw new Error('subtotal é obrigatório e deve ser maior que zero');
        }
    }

    // cria um novo pedido
    static criar(dados) {
        return new Pedido(
            dados.idCliente,
            dados.subTotal,
            dados.status,
            null
        );
    }

    // altera um pedido existente
    static alterar(dados, id) {
        return new Pedido(
            dados.idCliente,
            dados.subTotal,
            dados.status,
            id
        );
    }
}