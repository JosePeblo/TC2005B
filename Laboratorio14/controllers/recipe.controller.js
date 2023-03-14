const Recipe = require('../models/recipe');

exports.getRecipe = (req, res, next) => {
    const index = req.params.id;
    new Recipe().fetchOne(index - 1, (recipe) => {
        if(!recipe) {
            next();
        } else {
            recipe.recipe = recipe.recipe.replace(/(<|>)/g, '').replace(/\r\n/g, '<br>');
            res.render('receta', {content: recipe});
        }
    });
}

exports.getAllRecipes = (req, res) => {
    new Recipe().fetchAll((err, data) => {
        if(err) {
            res.sendStatus(500);
        } else {
            try {
                res.render('index', {content: JSON.parse(data), session: req.session.user});
            } catch {
                res.render('index', {content: null})
            }
        }
    });
}

exports.getSubmitionForm = (req, res, next) => {
    if (req.session.user) {
        res.render('submit');
    } else {
        res.redirect('/login');
    }
}

exports.createRecipe = (req, res, next) => {
    if(!req.files) {
        res.redirect('/recetas/crear/?err=true'); 
        return;
    } 
    const { image } = req.files;
    if(!image) {
        res.sendStatus(400);
        return;
    }
    const name = image.name.replace(/ /g, '_').replace(/\(|\)/g, '');
    image.mv(__dirname + '/../public/uploads/' + name);
    req.body.src = '/uploads/' + name;

    const recipe = new Recipe(req.body);
    recipe.save(() => { res.redirect('/recetas/crear/?err=false'); });
}
