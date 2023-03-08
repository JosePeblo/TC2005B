const { readFile, writeFile } = require('fs');

module.exports.sendAll = (filePath, res) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send();
        } else {
            res.send(data);
        }
    });
}

module.exports.sendOne = (filePath, res, next, index) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send();
        } else {
            const obj = JSON.parse(data)[index-1];
            if(obj) {
                res.send(obj);
            } else {
                next();
            }
        }
    });
}

module.exports.searchOne = (filePath, index, callback) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            callback(err);
        } else {
            const obj = JSON.parse(data)[index-1];
            if(obj) {
                callback(undefined, true);
            } else {
                callback(undefined, false);
            }
        }
    });
}

module.exports.createRecipe = (form, image, callback) => {
    readFile('./data/recipe_full.json', (err, data) => {
        if(err) {
            console.log(err);
            callback(err);
            return;
        } else {
            const {formObject} = form;
            const dataArray = JSON.parse(data);
            console.log(data);
            dataArray.push(formObject);
            writeFile('./data/recipe_full.json', JSON.stringify(dataArray), (err) => {
                if(err) {
                    callback(err);
                    return;
                } else {
                    callback();
                }
            });
        }
    });
}