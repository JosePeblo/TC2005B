const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../utils/database');

module.exports = class User {

    constructor(name, password) {
        this.name = name || null;
        this.password = password || null;
    }

    save() {
        return bcrypt.hash(this.password, 12)
        .then(hashedPassword => {
            return db.execute(
                'INSERT INTO user (username, password) VALUES (?,?)',
                    [this.name, hashedPassword])
                    .catch(err => { console.log(err); });
        });
    }

    static fetchOne(user) {
        return db.execute('SELECT id_user, username, password FROM user WHERE username = ?', [user]);
    }
}
