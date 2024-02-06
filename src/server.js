const express = require('express');

const server = express();

server.get('/hello', (_,res)=> res.send('Hello'));

const nameValidator = (req, res, next)=>{
    if(req.query.name){
        req.name = req.query.name;
        next();
    }else{
        next('Failed validation: No name in query!')
    }
}

function logger(req, _, next){
    console.log(req,path);
    next();
}

module.exports = {
    server,
};