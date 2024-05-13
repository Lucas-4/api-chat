const express = require("express");
const usersRouter = require("./routes/user");
const roomsRouter = require("./routes/room");
const messagesRouter = require("./routes/message");

const app = express();
const port = 3000; // Porta onde o servidor será executado

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

// Rotas para gerenciamento de usuários
app.use(usersRouter);
app.use(roomsRouter);
app.use(messagesRouter);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
