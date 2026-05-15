export class Produtos {
    #id;
    #nome;
    #descricao;
    #preco;
    #vinculoImagem;
    #qtdEstoque;
    #idCategoria;

    constructor(pId, pNome, pDescricao, pPreco, pVinculoImagem, pQtdEstoque, pIdCategoria) {
        this.#id = pId;
        this.nome = pNome;
        this.descricao = pDescricao;
        this.preco = pPreco;
        this.imagem = pVinculoImagem;
        this.qtdEstoque = pQtdEstoque;
        this.idCategoria = pIdCategoria;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(value) {
        this.#validarDescricao(value);
        this.#descricao = value;
    }

    get preco() {
        return this.#preco;
    }

    set preco(value) {
        this.#validarPreco(value);
        this.#preco = value;
    }

    get vinculoImagem() {
        return this.#vinculoImagem;
    }

    set imagem(value) {
        this.#validarImagem(value);
        this.#vinculoImagem = value;
    }

    get qtdEstoque() {
        return this.#qtdEstoque;
    }

    set qtdEstoque(value) {
        this.#validarQtd(value);
        this.#qtdEstoque = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    #validarDescricao(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('O campo descrição é obrigatório e deve ter entre 3 e 100 caracteres');
        }
    }

    #validarPreco(value) {
        if (value === undefined || value < 0) {
            throw new Error('O campo preco é obrigatório e deve ser um número positivo');
        }
    }

    #validarQtd(value) {
        if (value === undefined || value < 0) {
            throw new Error('O campo quantidade estoque é obrigatório e deve ser um número positivo');
        }
    }

    #validarImagem(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 250) {
            throw new Error('O campo imagem é obrigatório e deve ter entre 3 e 250 caracteres');
        }
    }

    #validarIdCategoria(value) {
        if (value === undefined || value < 0) {
            throw new Error('O campo idCategoria é obrigatório e deve ser um número positivo');
        }
    }

    static criar(dados) {
        return new Produtos(
            null,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.vinculoImagem,
            dados.qtdEstoque,
            dados.idCategoria
        );
    }

    static alterar(dados, id) {
        return new Produtos(
            id,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.vinculoImagem,
            dados.qtdEstoque,
            dados.idCategoria
        );
    }
}