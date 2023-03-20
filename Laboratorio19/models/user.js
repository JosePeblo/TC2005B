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

    static getPrivileges(user) {
        return db.execute(
            `SELECT P.name AS 'privilege'
             FROM user_role UR, role R, role_privileges RP, privilege P
             WHERE UR.id_user = ? AND
             UR.id_role = R.id_role AND 
             R.id_role = RP.id_role AND
             RP.id_privilege = P.id_privilege;`, [user]);
    }

    static fetchUserRecipes(user) {
        return db.execute(
            `SELECT R.id_recipe, R.id_user, R.name, R.description, R.src, U.username
             FROM recipe R, user U
             WHERE R.id_user = ? AND R.id_user = U.id_user`, [user]);
    }
}
