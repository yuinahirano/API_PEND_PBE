export class Cliente {
    #id
    #nome
    #cpf
    #telefone
    #dataCad

    constructor(nome, cpf, telefone, id){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone

    }

    //get e set
    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }
    set nome(value){
        this.#validarNome(value)
        this.#nome = value;
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(value){
        this.#validarCpf(value);
        this.#cpf = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){
        this.#telefone.#validarTelefone(value);
        this.#telefone = value;
    }


    //metodos
    #validarId(value){
        if(value == null && value < 0){
            throw new Error('Verifique o id informado');
        }
    }

    #validarNome(value){
        if(!value)
            throw new Error('Nome é um campo obrigatório');
        
        if(value.trim().length < 3)
            throw new Error('Nome deve ter no mínimo 3 caracteres');

        if(value.trim().length > 45)
            throw new Error('Nome deve ter no máximo 45 caracteres');
    }

    #validarCpf(value){
        if(!value)
            throw new Error('CPF é obrigatório');

        if(value.trim().length !=  11)
            throw new Error('CPF inválido');
    }

    #validarTelefone(value){
        if(!value)
            throw new Error('Telefone é obrigatório');

        if(value.trim().length != 11)
            throw new Error('Telefone inválido');
    }

    //factory methods
    static create(dados){
        return new Cliente(dados.nome, dados.cpf, dados.telefone, null)
    }

    static atualizar(dados){
        return new Cliente(dados.nome, dados.cpf, dados.telefone, dados.id,);
    }
}