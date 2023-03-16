require('dotenv').config();
const db = require('../utils/database');

module.exports = class Recipe {
    constructor(name, description, src, recipe, ingredients) {
        this.name = name || null;
        this.description = description || null;
        this.src = src || null;
        this.recipe = recipe || null;
        this.ingredients = ingredients || null;
    }

    save (id_user) {
        return db.execute(`INSERT INTO recipe (id_user, name, description, src, recipe, ingredients) 
        VALUES(?,?,?,?,?,?)`,[id_user, this.name, this.description, this.src, this.recipe, this.ingredients]);
    }

    static fetchAll() {
        return db.execute(`SELECT R.id_recipe, R.id_user, R.name, R.description, R.src, U.username
                           FROM recipe R, user U
                           WHERE R.id_user = U.id_user
                           ORDER BY id_recipe`);
    }

    static fetchOne(index) {
        return db.execute('SELECT name, description, src, recipe, ingredients FROM recipe WHERE id_recipe = ?', [index]);
    }

}

