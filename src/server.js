const express = require('express');

const server = express();

server.get('/hello', (_,res)=> res.send('Hello'));


module.exports = {
    server,
};