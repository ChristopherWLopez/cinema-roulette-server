const express = require('express');

const {User, Hobby} = require('../models');

const userRoutes = express();

// RESTful Route Declarations
userRoutes.get('/user', getUsers);
userRoutes.get('/user/:id', getUser);
userRoutes.post('/user', createUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);

async function getUsers(_,res){
    const allUsers = await User.findAll();
    res.json(allUsers);
}

async function getUser(req, res, next){
    const id = req.params.id;
    const user = await User.findOne({
        where: {id:id},
        include: Hobby,
    });
    if(user===null){
        next();
    } else {
        const rawUser = {
            id: user.id,
            username: user.username,
            birthday: user.birthday,
            hobbies: user.Hobbies.map((hobby)=> hobby.name),
        };
        res.json(rawUser);
    }
}