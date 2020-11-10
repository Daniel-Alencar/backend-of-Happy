import express from 'express';
import 'express-async-errors';
// framework
import path from 'path';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';


const app = express();
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
// caminho para a pasta uploads 
// __dirname se refere ao diretório atual

// Fluxo do nodeJS
/**
 * Requisição e resposta
 */

 // Rota
 // Recurso = usuário
 // Métodos HTTP = get, post, put e delete
 // Parâmetros = Query Params, Route Params e Body


 // GET => Buscar uma informação
 // POST => Criando uma informação
 // PUT => Editando uma informação
 // DELETE => Deletando uma informação

 // Query params => http://localhost:3333/users?search=diego
 // Route params => http://localhost:3333/users/1 (identificar do usuário)
 // Body => http://localhost:3333/users (identificar um recurso)


app.listen(5000);
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
 * "Cada Requisição nos dará um objeto derivado da classe"
 */