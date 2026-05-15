export class ItensPedido {

    #id;
    #idPedido;
    #idProduto;
    #quantidade;
    #valorItem;

    constructor(idProduto, quantidade, valorItem, id, idPedido) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.valorItem = valorItem;
    }

    // getters
    get id() { return this.#id; }
    get idPedido() { return this.#idPedido; }
    get idProduto() { return this.#idProduto; }
    get quantidade() { return this.#quantidade; }
    get valorItem() { return this.#valorItem; }

    // SETTERS
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set idPedido(value) {
        this.#validarIdPedido(value);
        this.#idPedido = value;
    }
    set idProduto(value) {
        this.#validarIdProduto(value);
        this.#idProduto = value;
    }
    set quantidade(value) {
        this.#validarQuantidade(value);
        this.#quantidade = value;
    }
    set valorItem(value) {
        this.#validarValorItem(value);
        this.#valorItem = value;
    }

    // VALIDACOES PRIVADAS
    #validarId(value) {
        if (value != null && value <= 0) throw new Error('verifique o id informado');
    }
    #validarIdPedido(value) {
        
        if (value != null && value <= 0) throw new Error('verifique o ID do pedido informado');
    }
    #validarIdProduto(value) {
        if (!value || value <= 0) throw new Error('verifique o ID do produto informado');
    }
    #validarQuantidade(value) {
        if (!value || value <= 0) throw new Error('quantidade deve ser maior que zero');
    }
    #validarValorItem(value) {
        if (!value || value <= 0) throw new Error('informe um valor válido para o item');
    }

    
    static calcularSubTotalItens(itens) {
        return itens.reduce((total, item) => total + (item.valorItem * item.quantidade), 0);
    }

    // FACTORY METHODS


    static criar(dados) {
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, null, null);
    }


    static criarComPedido(dados) {
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, null, dados.idPedido);
    }

    static alterar(dados, id) {
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, id, dados.idPedido);
    }
}