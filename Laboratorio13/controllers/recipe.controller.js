const { readFile, writeFile } = require('fs');

exports.getRecipe = (req, res, next) => {
    const index = req.params.id;
    readFile('./data/recipe_full.json', 'utf-8', (err, data) => {
        if(err) {
            next();
        } else {
            const obj = JSON.parse(data)[index - 1];
            if(obj) {
                obj.recipe = obj.recipe.replace(/(<|>)/g, '').replace(/\r\n/g, '<br>');
                res.render('receta', {content: obj});
            } else {
                next(); 
            }
        }
    });
}

exports.getAllRecipes = (req, res) => {
    readFile('./data/recipe_full.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500);
        } else {
            try {
                res.render('index', {content: JSON.parse(data)});
            } catch {
                res.render('index', {content: null})
            }
        }
    });
}

exports.getSubmitionForm = (req, res, next) => {
    res.render('submit');
}

exports.createRecipe = (req, res, next) => {
    if(!req.files) {
        res.redirect('/recetas/crear/?err=true');  
    } 
    const { image } = req.files;
    if(!image) {
        res.sendStatus(400);
        return;
    }
    const name = image.name.replace(/ /g, '_');
    image.mv(__dirname + '/../public/uploads/' + name);
    req.body.src = './uploads/' + name;

    readFile('../data/recipe_full.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500);
            return;
        } else {
            const recipes = JSON.parse(data);
            form.href = './recetas/' + (recipes.length+1);
            form.ingredients = JSON.parse(form.ingredients);
            console.log(form);
            recipes.push(form);
            writeFile(filePath, JSON.stringify(recipes), (err) => {
                if(err) {
                    res.sendStatus(500);
                    return;
                } else {
                    res.redirect('/recetas/crear/?err=false');
                }
            });
        }
    });
    
    
    
}
