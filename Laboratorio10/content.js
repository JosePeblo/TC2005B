const { readFileSync } = require('fs');

let ContentPath;

module.exports.setContentPath = (path) => {
    ContentPath = path;
}

module.exports.getContent = () => {

    return readFileSync(ContentPath);
}