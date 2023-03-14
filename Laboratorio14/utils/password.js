const crypto = require('crypto');

const validPass = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~])[A-Za-z0-9 ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~]{8,}/g;

module.exports.validatePassword = (password) => {
    if(password) {
        const pass = password.match(validPass);
        if(pass) return true;
    }
    return false
}

module.exports.hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
}
