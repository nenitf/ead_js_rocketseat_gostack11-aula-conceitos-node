const express = require('express');

const app = express();

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informação
 * POST: Criar informação
 * PUT (toda)/PATCH (parcial): Alterar informação
 * DELETE: Deletar informação
 */

app.get('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
    ]);
});

// mesmo endereço (recurso) método diferente
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ]);
});

// localhost:3333/projects/1
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.put('/projects/:id', (request, response) => {
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