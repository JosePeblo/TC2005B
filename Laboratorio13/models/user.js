const { readFile, writeFile } = require('fs');

module.exports = class User {

    constructor(name, password) {
        if(name && password) {
            this[name] = password;
        } 
    }

    save() {
        console.log(this);

    }

    fetchAll(callback) {
        readFile('./data/users.json', 'utf-8', (err, data) => {
            if(err) {
                callback(err);
            } else {
                callback(undefined, JSON.parse(data));
            }
        });
    }
}
