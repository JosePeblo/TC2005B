const { readFileSync, writeFile } = require('fs');
const { hashPassword } = require('./utils');

let users;

let userOptions = {
    dbpath: ''
};

const updateUsersData = (options = {}) => {
    if(options.dbpath) {
        userOptions.dbpath = options.dbpath;
    }
    users = JSON.parse(readFileSync(userOptions.dbpath));
}

module.exports.updateUsersData = updateUsersData;

const userExists = (user) => {
    if(users[user]) {
        // El usuario ya existe
        return true;
    } else {
        // El usuario no existe
        return false
    }
}

module.exports.createNewUser = (user, password, callback) => {
    if(!userExists(user)) {
        users[user] = hashPassword(password);
        writeFile(userOptions.dbpath, JSON.stringify(users), () => {
            updateUsersData();
            callback();
        });
    } else {
        callback(new Error('El usuario ya existe'));
    }
}

module.exports.validUser = (user, password) => { return (users[user] === hashPassword(password)); }