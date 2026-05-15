export class Endereco {
    #id
    #idCliente
    #logradouro
    #numero
    #complemento
    #bairro
    #cidade
    #uf
    #cep

    constructor(logradouro, numero, complemento, bairro, cidade, uf, cep, id, idCliente){
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
        this.id = id;
        this.idCliente = idCliente;
    }

    //get set
    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get idCliente(){
        return this.#idCliente;
    }
    set idCliente(value){
        this.#validarIdCliente;
        this.#idCliente = value;
    }

    get logradouro(){
        return this.#logradouro;
    }
    set logradouro(value){
        this.#validarTexto(value, 'logradouro');
        this.#logradouro = value
    }

    get numero(){
        return this.#numero;
    }
    set numero(value){
        this.#validarTexto(value, 'número');
        this.#numero = value;
    }

    get complemento(){
        return this.#complemento;
    }
    set complemento(value){
        this.#complemento = value || null;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(value){
        this.#validarTexto(value, 'bairro');
        this.#bairro = value;
    }

    get cidade(){
        return this.#cidade;
    }
    set cidade(value){
        this.#validarTexto(value, 'cidade');
        this.#cidade = value;
    }

    get uf(){
        return this.#uf;
    }
    set uf(value){
        if(!value || value.length != 2)
            throw new Error('Insira o UF corretamente');
        this.#uf = value.toUpperCase();
    }

    get cep(){
        return this.#cep;
    }
    set cep(value){
        if(!value || value.trim().length != 8)
            throw new Error('CEP inválido');
        this.#cep = value;
    }

    //validações
    #validarId(value){
        if(value == null || value <= 0)
            throw new Error('Id inválido');
    }

    #validarIdCliente(value){
        if(!value || value <= 0)
            throw new Error('Id do cliente inválido')
    }

    #validarTexto(value, campo){
        if(!value || value.trim().length < 2)
            throw new Error(`O campo ${campo} é obrigatório!`);
    }

    
}