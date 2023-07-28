import express from 'express';

const server = express();

server.get('/', (req, res) => {
    return res.send("Welcome to Our AZALEYA API Blog");
})

export { server };
