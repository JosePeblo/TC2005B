require('dotenv').config();
const db = require('../utils/database');

module.exports = class User {

    constructor(name, password) {
        this.name = name || null;
        this.password = password || null;
    }

    save() {
        return db.execute('INSERT INTO user (username, password) VALUES (?,?)', [this.name, this.password]);
    }

    static fetchOne(user) {
        return db.execute('SELECT id_user, username, password FROM user WHERE username = ?', [user]);
    }
}
