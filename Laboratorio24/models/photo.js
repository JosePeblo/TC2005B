const db = require("../utils/database");

module.exports = class Photo {
    /** @param {String} path */
    constructor(path){
        this.path = path;
    }

    save() {
        return db.execute(`INSERT INTO photo (path) VALUES (?)`, [this.path]);
    }

    static getAllPaths() {
        return db.execute(`SELECT * FROM photo`);
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Promise}
     */
    static getOnePath(id) {
        return db.execute(`SELECT path FROM photo WHERE id = ?`, [id]);
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Promise}
     */
    static delete(id) {
        return db.execute(`DELETE FROM photo WHERE id = ?`, [id]);
    }
}