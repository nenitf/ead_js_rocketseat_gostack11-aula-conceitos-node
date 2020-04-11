const express = require('express');
const { uuid, isUuid } = require('uuidv4'); // universe unique id

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

  /**
   * Middleware:
   * 
   * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição
   */

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(logLabel);

    return next(); // avança próximo middleware
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' })
    }

    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);


const projects = [];

//app.get('/projects', logRequest, middleware2, 3, 4 ... (request, response) => {
app.get('/projects', (request, response) => {
    const { title } = request.query;
    
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

// mesmo endereço (recurso) método diferente
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    
    const project = { id: uuid(), title, owner }

    projects.push(project);

    return response.json(project);
});

// localhost:3333/projects/1
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id)
    
    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' })
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

// localhost:3333/projects/1
// browser não consegue acessar com esse método, precisa de restclient (insomnia)
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id)
    
    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send(); // resposta vazia mas com 204
});

// escolha pessoal do Diego
//app.listen(3333);
app.listen(3333, () => {
    console.log('🚀 Back-end started!');
});
