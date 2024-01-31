const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../../models');

COMPLEXITY = 8;

//establish what the user object looks like and its properties that defines this object. 
function makeUser(sequelize);{
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    User.createWithHashed = async (username, password)=>{

        password = await bcrypt.hash(password, COMPLEXITY);
        console.log('Creating new user', username, password);
        const user = await User.create({ username, password });
        return user;
    };

    User.findLoggedIn = async (username, password) => {
        // checks for "User" (model)
        const user = await User.findOne({ where: { username } });
        // if the user is null... then do nothing.
        if(user == null){
            return null;
        }
        if(await bcrypt.compare(password, user.password)){
            return user;
        }
        return null;
    };

    return User;
}

module.exports = { makeUser };