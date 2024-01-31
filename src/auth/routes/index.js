const express = require('express');
const base64 = require('base-64');
// taking user from the model where we build the user inside of auth
const { User } = require('../models');

const authRoutes = express();

authRoutes.post('/signup', signup);

authRoutes.post('/signin', signin);

async function signup(req, res, next){
    // on successful account creation, return a 201 status with the user object in the body
    // username and password gets sent to the req.body. These will get stored in our model
    const { username, password } = req.body;
    try{
        await User.createWithHashed(username, password);
        res.send(201);
    } catch(e){
        console.log(e)
    }
}

async function signin(req, res, next){
    let authorization = req.header('Authorization');
    if(!authorization.startsWith('Basic ')){
        next(new Error('Invalid authorization scheme'));
        return;
    }
    authorization = base64.decode(authorization.replace('Basic ', ''));

    console.log('Basic authorization request', authorization);

    const [username, password] = authorization.split(':');
    let user = await User.findLoggedIn(username, password);
    if (user){
        res.status(200).send({ username: user.username });
    }else{
        next(new Error('Invalid login'));
    }
}

module.exports = { authRoutes };
