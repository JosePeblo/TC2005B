const { Router } = require('express');
const { getOne, createRecipe } = require('../recipe');
const router = Router();

router.get('/recetas/:id', (req, res, next) => {
    getOne('./data/recipe_full.json', req.params.id, (err, data) => {
        if(err) {
            next();
        }
        else {
            data.recipe = data.recipe.replace(/(<|>)/g, '').replace(/\r\n/g, '<br>');
            res.render('receta', {content: data});
        }
    });
});

router.get('/recetas/crear', (req, res, next) => {
    res.render('submit');
});

router.post('/recetas/crear', (req, res, next) => {

    if(req.files) {
        const { image } = req.files;
        if(!image) {
            res.sendStatus(400);
            return;
        }
        const name = image.name.replace(/ /g, '_');
        image.mv(__dirname + '/../public/uploads/' + name);
        req.body.src = './uploads/' + name;
        createRecipe('./data/recipe_full.json', req.body, (err)=>{
            if(err) {
                res.sendStatus(500);
            }
            res.redirect('/recetas/crear/?err=false');
        });
    } else {
        res.redirect('/recetas/crear/?err=true');
    }
    
});

module.exports = router;