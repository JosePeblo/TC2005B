const { readFile, writeFile } = require('fs');
const { hashPassword } = require('../utils/password');

const usersFile = './data/users.json';

module.exports = class User {

    constructor(name, password) {
        if(name && password) {
            this.setUser(name, password);
        }
    }

    save(callback) {
        if(Object.keys(this).length === 0) {
            throw 'no entity can be saved';
        } else {
            this.fetchAll((err, data) => {
            if(err) {
                throw 'error while fetching users';
            }
                let users = JSON.parse(data);
                users = {...users, ...this};
                writeFile(usersFile, JSON.stringify(users), callback);
            });
        }
    }

    fetchAll(callback) {
        readFile(usersFile, 'utf-8', callback);
    }

    fetchOne(user, callback) {
        this.fetchAll((err, data) => {
            if(err) {
                throw 'error while fetching users';
            }
            let users = JSON.parse(data);
            callback(users[user]);
        });
    }

    setUser(name, password) {
        this[name] = hashPassword(password);
    }
}
