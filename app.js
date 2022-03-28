const express = require('express');
const app = express();
cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/', function(req, res) {
    res.json({message:'Bem vindo ao catálogo de séries e filmes.'})
});

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Servidor iniciado em http://localhost:5000', host, port)
});

module.exports = app;