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