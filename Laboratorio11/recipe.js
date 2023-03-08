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

module.exports.createRecipe = (filePath ,form, callback) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            callback(err);
            return;
        } else {
            const recipes = JSON.parse(data);
            form.href = './receta/' + (recipes.length+1);
            recipes.push(form);
            writeFile(filePath, JSON.stringify(recipes), (err) => {
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