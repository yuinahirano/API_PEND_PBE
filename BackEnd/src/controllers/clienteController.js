import {Cliente} from '../models/clienteModel.js';
import { Endereco } from '../models/enderecoModel.js';
import { ValidarCpf } from '../utils/validarCpf.js';
import axios from 'axios';
import { clienteRepository } from '../repositories/clienteRepository.js';

const clienteController = {

    create: async (req, res)=>{
        
        try {
            
            let {nome, numero, complemento, cpf, cep} = req.body;

            const cepRegex = /^[0-9]{8}$/; //valida o tamanho de exatos 8 digitos

            if(!ValidarCpf(cpf))
                return res.status(400).json({message: 'O CPF é inválido'});

            if(cepRegex(cep))
                return res.status(400).json({message: 'O CEP é inválido'});


            //CEP
            const respAPI = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); //api para validar e achar o endereco pelo cep

            if (respAPI.data.error){
                throw new Error('Erro ao consultar o CEP pela API');
            }

            const logradouro = respAPI.data.logradouro;
            const bairro = respAPI.data.bairro;
            const cidade = respAPI.data.localidade;
            const uf = respAPI.data.uf;

            const cliente = Cliente.create({ nome, cpf });
            const endereco = Endereco.create({ logradouro, numero, complemento, bairro, cidade, uf, cep });
            const result = await clienteRepository.criar(cliente, endereco, telefone);

            return res.status(201).json({
                message: 'Cliente criado com sucesso!',
                cliente: result
            });

        } catch (error) {

            console.log(error);
            return res.status(500).json({
                message: 'Erro no servidor',
                errorMessage: error.message
            });

        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    
}

export default clienteController