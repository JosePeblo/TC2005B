const { readFile } = require('fs');

module.exports.sendHtml = (filePath, res) => {
    readFile(filePath, 'utf-8', (err, html) => {
        if(err) {
            res.status(500).send();
        } else {
            res.send(html);
        }
    });
}