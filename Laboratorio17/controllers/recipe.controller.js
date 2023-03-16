const Recipe = require('../models/recipe');

exports.getRecipe = (req, res, next) => {
    const index = req.params.id;
    Recipe.fetchOne(index).then(([rows, fieldData]) => {
        if(rows.length === 0) {
            next();
            return;
        }
        const recipe = rows[0];
        recipe.ingredients = JSON.parse(recipe.ingredients);
        if(recipe.recipe) {
            recipe.recipe = recipe.recipe.replace(/(<|>)/g, '').replace(/\r\n/g, '<br>');
        }
        res.render('receta', {content: recipe});

    }).catch(()=>{ console.log('Database Error'); });
}

exports.getAllRecipeCards = (req, res) => {
    Recipe.fetchAll().then(([rows, fieldData]) => {
        res.render('index', {content: rows, session: req.session.user});
    }).catch(()=>{ console.log('Database Error'); });
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
        res.redirect('/crear/?err=true'); 
        return;
    } 
    const { image } = req.files;
    if(!image) {
        res.sendStatus(400);
        return;
    }
    const query = req.body;
    const name = image.name.replace(/ /g, '_').replace(/\(|\)/g, '');
    image.mv(__dirname + '/../public/uploads/' + name);
    req.body.src = '/uploads/' + name;
    const recipe = new Recipe(query.name, query.description, query.src,
                                query.recipe, query.ingredients);
    recipe.save(req.session.userid).then(()=> { res.redirect('/crear/?err=false'); }).catch(()=>{ console.log('Database Error'); });
}
