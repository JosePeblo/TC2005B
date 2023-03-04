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

module.exports.queryToJSON = (query) => {
    if(query) {
        const parsedObject = {};
        const format1 = query.replace(/=/g, '":"').replace(/&/g, '","');
        const obj = JSON.parse('{"'+ format1 +'"}');
        for(let [key, value] of Object.entries(obj)) {
            parsedObject[decodeURIComponent(key)] = decodeURIComponent(value);
        }
        return parsedObject;
    } else {
        return null
    }
}

module.exports.createConnectionId = () => {
    return Math.floor(Math.random()*(1000000 - 100000) + 100000);
}