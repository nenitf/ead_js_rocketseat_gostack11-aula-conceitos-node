const express = require('express');

const app = express();

// use é usado para adicionar função que todas rotas devem passar
// deve vir antes das rotas!
app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informação
 * POST: Criar informação
 * PUT (toda)/PATCH (parcial): Alterar informação
 * DELETE: Deletar informação
 */

 /**
  * Tipos de parâmetros
  * 
  * Query params: principalmente para filtros e paginação
  *     localhost:3333/projects?title=React&owner=Diego
  * Route Params: identificar recursos (id de qual usuário? etc)
  * Request Body: conteúdo para criar ou editar recurso (com JSON)
  */

app.get('/projects', (request, response) => {
    // localhost:3333/projects?title=React&owner=Diego
    // query params
    const query = request.query;
    const { title, owner} = request.query;
    console.log(title, owner, query);
    

    return response.json([
        'Projeto 1',
        'Projeto 2',
    ]);
});

// mesmo endereço (recurso) método diferente
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.post('/projects', (request, response) => {
    // route body
    const body = request.body; // undefined se não usar app.use(express.json());
    const { title, owner } = request.body;
    console.log(title, owner, body);


    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ]);
});

// localhost:3333/projects/1
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.put('/projects/:id', (request, response) => {
    // localhost:3333/projects/1
    // route params
    const params = request.params;
    const { id } = request.params;
    console.log(id, params);


    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);
});

// localhost:3333/projects/1
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3',
    ]);
});

// escolha pessoal do Diego
//app.listen(3333);
app.listen(3333, () => {
    console.log('🚀 Back-end started!');
});