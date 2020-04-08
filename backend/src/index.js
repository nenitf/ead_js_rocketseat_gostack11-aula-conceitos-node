const express = require('express');

const app = express();

// localhost:3333/hello
app.get('/hello', (request, response) => {
    // request: informações da requisição
    // response: informações para retornar ao cliente
    return response.json({ message: 'Hello World '});
});

// escolha pessoal do Diego
app.listen(3333);