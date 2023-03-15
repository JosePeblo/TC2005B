const { readFile, writeFile } = require('fs');
const recipeFile = './data/recipe_full.json';

module.exports = class Recipe {
    constructor(obj) {
        if(obj) {
            this.setRecipe(obj);
        }
    }

    save (callback) {
        if(Object.keys(this).length === 0) {
            throw 'no entity can be saved';
        } else {
            this.fetchAll((err, data) => {
                if(err) {
                    throw 'error while fetching recipes';
                }
                let recipes = JSON.parse(data);
                this.href = './recetas/' + (recipes.length + 1);
                this.ingredients = JSON.parse(this.ingredients);
                recipes.push(this);
                writeFile(recipeFile, JSON.stringify(recipes), callback);
            });
        }
        
    }

    fetchAll(callback) {
        readFile(recipeFile, 'utf-8', callback);   
    }

    fetchOne(index, callback) {
        this.fetchAll((err, data) => {
            if(err) {
                throw 'error while fetching recipes';
            }
            let recipes = JSON.parse(data);
            callback(recipes[index]);
        });

    }

    setRecipe(obj) {
        this.name = obj.name;
        this.author = obj.author;
        this.desc = obj.desc;
        this.src = obj.src;
        this.href = obj.href;
        this.ingredients = obj.ingredients;
        this.amounts = obj.amounts;
        this.recipe = obj.recipe;
    }
}