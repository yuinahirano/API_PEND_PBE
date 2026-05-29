# 📦 API de Gerenciamento de Pedidos

API REST desenvolvida em **Node.js + Express + MySQL**, responsável pelo gerenciamento de:

- Categorias
- Produtos
- Pedidos
- Itens do Pedido
- Upload de imagens

---

# 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- mysql2
- Multer
- Dotenv

---

# 📂 Estrutura do Projeto

```bash
src/
│
├── configs/
│   ├── Database.js
│   └── upload.multer.js
│
├── controllers/
│   ├── categoriaController.js
│   ├── pedidoController.js
│   └── produtoController.js
│
├── middleware/
│   └── uploadImagem.middleware.js
│
├── repositories/
│   ├── categoriaRepository.js
│   ├── pedidoRepository.js
│   └── produtoRepository.js
│
├── models/
│   ├── Categoria.js
│   ├── Pedido.js
│   ├── ItensPedido.js
│   └── Produtos.js
│
├── enums/
│   └── statusPedido.js
│
├── routes/
│   ├── categoria.routes.js
│   ├── pedido.routes.js
│   └── produto.routes.js
│
└── uploads/
    └── imagens/
```

---

# ⚙️ Configuração

## Variáveis de Ambiente

Crie um arquivo `.env`

```env
SERVER_PORT=8000
DB_HOST=10.87.169.69
DB_DATABASE=api_pend_pbe
DB_USER=LABUBUS_USER
DB_PASSWORD=
DB_PORT=3306
```

---

# 🗄️ Configuração do Banco

Arquivo:

`configs/Database.js`

Responsável por:

- Singleton da conexão
- Pool de conexões
- Controle de concorrência

Recursos:

- `connectionLimit: 100`
- Conexão reaproveitável
- Instância única da aplicação

---

# 📤 Sistema de Upload

Arquivo:

`configs/upload.multer.js`

Responsável por:

- Criar diretórios automaticamente
- Gerar nomes únicos com hash
- Validar tipo da imagem
- Definir limite de tamanho

Tipos permitidos:

```javascript
[
  'image/png',
  'image/jpeg',
  'image/jpg'
]
```

---

# 🛡 Middleware de Upload

Arquivo:

`middleware/uploadImagem.middleware.js`

Responsável por:

- Receber imagem do produto
- Validar extensão
- Salvar em:

```bash
/uploads/imagens
```

Campo esperado no formulário:

```http
vinculoImg
```

Limite:

```http
10MB
```

---

# 📌 Rotas

# 🏷 Categorias

Base:

```http
/api/categorias
```

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/` | Criar categoria |
| GET | `/` | Listar categorias |
| GET | `/categorias/:id` | Buscar por ID |
| PUT | `/:id` | Editar categoria |
| DELETE | `/:id` | Remover categoria |

---

# 🛍 Produtos

Base:

```http
/api/produtos
```

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/` | Criar produto com imagem |
| GET | `/` | Listar todos |
| GET | `/:id` | Buscar por ID |
| GET | `/estoque/:id` | Consultar estoque |
| PUT | `/:id` | Editar produto |
| DELETE | `/:id` | Excluir produto |

---

## Upload via FormData

Campo obrigatório:

```http
vinculoImg
```

Exemplo:

```form-data
nome: Coca-Cola
descricao: Refrigerante
preco: 8.50
qtdEstoque: 50
idCategoria: 1
vinculoImg: [arquivo]
```

---

# 📦 Pedidos

Base:

```http
/api/pedidos
```

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/` | Criar pedido |
| GET | `/` | Listar pedidos |
| PATCH | `/:pedidoId/status` | Atualizar status |
| POST | `/:pedidoId/itens` | Adicionar item |
| PUT | `/:pedidoId/itens/:itemId` | Editar item |
| DELETE | `/:pedidoId/itens/:itemId` | Excluir item |

---

# 🔄 Fluxo de Pedido

## Criar Pedido

```json
{
  "idCliente": 1,
  "itens": [
    {
      "idProduto": 2,
      "quantidade": 3,
      "valorItem": 15.50
    }
  ]
}
```

Status inicial:

```javascript
ABERTO
```

---

## Atualizar Status

```json
{
  "status": "FECHADO"
}
```

Status válidos:

- ABERTO
- FECHADO
- CANCELADO

---

# 🧮 Regras Automáticas

Sempre que um item é:

- Adicionado
- Editado
- Removido

A API recalcula automaticamente:

```javascript
SubTotal = soma(Quantidade * ValorItem)
```

---

# ❌ Tratamento de Erros

## Erro interno

```json
{
  "message": "Ocorreu um erro no servidor",
  "errorMessage": "detalhes"
}
```

---

## Não encontrado

```json
{
  "message": "Pedido não encontrado"
}
```

---

## Status inválido

```json
{
  "message": "Status inválido"
}
```

---

## Arquivo inválido

```json
{
  "message": "Tipo de arquivo não permitido"
}
```

---

## Quantidade inválida

```json
{
  "message": "Informe uma quantidade válida (> 0)"
}
```

---

# ▶ Executando o Projeto

Instalar dependências:

```bash
npm install
```

Rodar:

```bash
npm run dev
```

Servidor:

```http
http://localhost:8000
```

---

# 🧪 Testes

Ferramentas recomendadas:

- Insomnia

---

# 👨‍💻 Arquitetura Aplicada

O projeto segue:

- MVC
- Repository 
- Singleton 
- Middleware 
- Transaction Control
- REST API Design

---

# 👩‍💻 Autor

Projeto acadêmico desenvolvido para prática de:

- APIs REST
- Upload de arquivos
- MySQL
- Organização em camadas
- Boas práticas Node.js