const { readFile, writeFile } = require('fs');

module.exports.getAll = (filePath, callback) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            callback(err);
        } else {
            callback(undefined, data);
        }
    });
}

module.exports.getOne = (filePath, index, callback) => {
    readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            callback(err);
        } else {
            const obj = JSON.parse(data)[index-1];
            if(obj) {
                callback(undefined, obj);
            } else {
                callback(true);
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
            form.href = './recetas/' + (recipes.length+1);
            form.ingredients = JSON.parse(form.ingredients);
            console.log(form);
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