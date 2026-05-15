export class Pedido {

    #id;
    #idCliente;
    #subTotal;
    #status;
    #dataCad;

    constructor(idCliente, subTotal, status, id) {
        this.id = id;
        this.idCliente = idCliente;
        this.subTotal = subTotal;
        this.status = status;
    }

    // GETTERS
    get id() { return this.#id; }
    get idCliente() { return this.#idCliente; }
    get subTotal() { return this.#subTotal; }
    get status() { return this.#status; }

    // SETTERS
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
        
        if (!value) throw new Error('Status é obrigatório');
        this.#status = value;
    }

    // VALIDAÇÕES PRIVADAS
    #validarId(value) {
        if (value != null && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }
    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('idCliente é obrigatório e deve ser maior que zero');
        }
    }
    #validarSubTotal(value) {
        if (value == null || value <= 0) {
            throw new Error('subTotal é obrigatório e deve ser maior que zero');
        }
    }

    // FACTORY METHODS
    static criar(dados) {
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, null);
    }

    static alterar(dados, id) {
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, id);
    }
}