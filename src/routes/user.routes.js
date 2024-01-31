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
        where: { id:id },
        include: Hobby,
    });
    if(user===null){
        next();
    } else {
        const rawUser = {
            id: user.id,
            username: user.username,
            birthday: user.birthday,
            // hobbies: user.Hobbies.map((hobby)=> hobby.name),
        };
        res.json(rawUser);
    }
}

async function deleteUser(req, res, next){
    const id = req.params.id;
    const user = await User.findOne({ where: { id:id } });
    if(user === null){
        next();
    } else {
        await user.destroy();
        res.json({});
    }
}

async function createUser(req, res){
    const username = req.body.username;
    const birthday = Date.parse(req.body.birthday);
    const user = await User.create({
        username,
        birthday,
    });

    const hobbies = req.body.hobbies ?? [];
    for(const name of hobbies){
        await user.createHobby({ name });
    }
    res.json(user);
}

async function updateUser(req, res, next){
    const id = req.params.id;
    let user = await User.findOne({ where: {id:id}});
    if(user==null){
        next();
    } else {
        const username = req.body.username;
        const birthday = Date.parse(
            req.body.birthday ?? user.birthday.toISOString()
        );
        let updateUser = {
            username,
            birthday,
        };

        user = await user.update(updateUser);

        res.json(user);
    }
}

module.exports = {
    userRoutes,
}