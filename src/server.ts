import express from 'express';
import 'express-async-errors';
// framework

import path from 'path';
import cors from 'cors';

import './database/connection';
// faz a nossa conexão com o banco de dados

import routes from './routes';
import errorHandler from './errors/handler'; 

const app = express();
// configura o node para que outras aplicações possam fazer requisições de outros domínios (sem precisar estar usando a mesma porta (exemplo: 5000))
app.use(cors());
// habilitando o express para entender json na requisição body
app.use(express.json());
// habilita o express a ler o nosso arquivo de rotas (routes)
app.use(routes);
// configura o express a acessar as imagens que nós fizemos upload
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// habilita o express a trabalhar com erros
app.use(errorHandler);



// Fluxo do nodeJS
/**
 * Requisição e resposta
**/

// Rota = conjunto de tudo
// Recurso = usuário
// Métodos HTTP = get, post, put e delete
// Parâmetros = Query Params, Route Params e Body

// GET => Buscar uma informação
// POST => Criando uma informação
// PUT => Editando uma informação
// DELETE => Deletando uma informação

// Query params => http://localhost:3333/users?search=diego
// Route params => http://localhost:3333/users/1 (identificar um recurso (um usuário))
// Body => http://localhost:3333/users (identificar um recurso)


app.listen(5000, () => {
    console.log('Servidor na porta 5000');
});
// localhost:5000



// Existem 3 formas de lidar com banco de dados dentro da nossa aplicação
// Driver nativo, Query builder e ORM
/**
 * Driver nativo => Permite executar as querys do banco de dados no próprio node (mas sem nenhuma abstração)
 * sqlite3.query('SELECT *FROM users');
 * 
 * Query builder => As querys são integradas ao nosso javascript
 * knex('users').select('*').where("name", "Daniel");
 * 
 * ORM => Classes simbolizam tabelas do banco de dados
 * "Cada Requisição nos dará objetos derivados da classe"
 */