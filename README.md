## BookTrack é uma api que permite usuários adicionar, atualizar e fazer review de livros

## Rotas disponíveis
| Rotas |
| ----- |
| **post /users/create**            |
| **post /login**                   |
| **get /users/userId/:id**         |
| **get /users/allUsers**           |
| **put /users/update/:id**         |
| **delete /users/delete/:id**      |
| **get /books/getAll**             |
| **get /books/singleBook/:bookId** |
| **get /books/userBooks**          |
| **post /books/add**               |
| **put /books/update/:bookId**     |  
| **delete /books/delete/:bookId**  |


Como utilizar:
## Clone o repositório:
```
git clone https://github.com/aarthuralveese/BookTrack.git
```

## Crie um banco de dados relacional, nesse caso o serviço usado foi o supabase
## No editor sql do supabase cole e rode o código:
```SQL
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TYPE livro_status AS ENUM (
  'Quero Ler',
  'Lendo',
  'Lido'
);

CREATE TABLE livro (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autor VARCHAR(255),
  status livro_status NOT NULL,
  avaliacao SMALLINT,
  data_conclusao TIMESTAMPTZ,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id)
);
```
## Crie um .env dentro da pasta server com as variáveis referentes ao seu serviço de banco de dados
```
SUPABASE_URL=
DB_KEY=
DB_JWT_SECRET=
```

## Navegue para a pasta correta e instale as dependencias:
```
cd BookTrack/server
npm install
```

## Rode o projeto:
```
cd server/
npm run dev
```

## No postman api teste a rota post users/create
## Passe no body um json com as informações:
```json
{
  "nome": ,
  "email": ,
  "senha":
}
```
## Após isso faça login com a rota post /login:
```json
{
  "email": ,
  "senha":
}
```
## Postman vai retornar um token que guarda as informações do usuário logado, copie o token vá em autorização -> selecione bearer token e cole o token.
Você está logado e tem autorização para adicionar, editar e deletar seus livros!!
