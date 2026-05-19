export class ItensPedido {

    // atributos privados da classe
    #id;
    #idPedido;
    #idProduto;
    #quantidade;
    #valorItem;

    // construtor responsável por inicializar o item
    constructor(idProduto, quantidade, valorItem, id, idPedido) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.valorItem = valorItem;
    }

    // getters para acessar os atributos privados
    get id() { return this.#id; }
    get idPedido() { return this.#idPedido; }
    get idProduto() { return this.#idProduto; }
    get quantidade() { return this.#quantidade; }
    get valorItem() { return this.#valorItem; }

    // setters para validar e definir os valores

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

    // valida se o id é válido
    #validarId(value) {
        if (value != null && value <= 0) {
            throw new Error('verifique o id informado');
        }
    }

    // valida se o id do pedido é válido
    #validarIdPedido(value) {
        if (value != null && value <= 0) {
            throw new Error('verifique o id do pedido informado');
        }
    }

    // valida se o id do produto é válido
    #validarIdProduto(value) {
        if (!value || value <= 0) {
            throw new Error('verifique o id do produto informado');
        }
    }

    // valida se a quantidade é maior que zero
    #validarQuantidade(value) {
        if (!value || value <= 0) {
            throw new Error('quantidade deve ser maior que zero');
        }
    }

    // valida se o valor do item é válido
    #validarValorItem(value) {
        if (!value || value <= 0) {
            throw new Error('informe um valor válido para o item');
        }
    }

    // calcula o subtotal somando todos os itens
    static calcularSubTotalItens(itens) {
        return itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade),
            0
        );
    }

    // cria um item sem pedido associado
    static criar(dados) {
        return new ItensPedido(
            dados.idProduto,
            dados.quantidade,
            dados.valorItem,
            null,
            null
        );
    }

    // cria um item já vinculado a um pedido
    static criarComPedido(dados) {
        return new ItensPedido(
            dados.idProduto,
            dados.quantidade,
            dados.valorItem,
            null,
            dados.idPedido
        );
    }

    // altera um item existente
    static alterar(dados, id) {
        return new ItensPedido(
            dados.idProduto,
            dados.quantidade,
            dados.valorItem,
            id,
            dados.idPedido
        );
    }
}