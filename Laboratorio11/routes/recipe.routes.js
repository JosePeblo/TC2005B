const { Router } = require('express');
const { sendAll, sendOne, searchOne, createRecipe } = require('../recipe');
const { sendHtml } = require('../utils');
const router = Router();

router.get('/recetas', (req, res) => {
    sendAll('./data/recipe_full.json', res);
    
});

router.get('/recetas/:id', (req, res, next) => {
    searchOne('./data/recipe_full.json', req.params.id, (err, stat) => {
        if(err) 
            res.status(500).send();
        else if(!stat) 
            next();
        else sendHtml('./pages/receta.html', res);
    });
});

router.get('/crearReceta', (req, res, next) => {
    sendHtml('./pages/submit.html', res);
});

router.post('/crearReceta', (req, res, next) => {

    if(req.files) {
        const { image } = req.files;
        if(!image) {
            res.sendStatus(400);
            return;
        }
        image.mv(__dirname + '/../public/uploads/' + image.name);
        req.body.src = './uploads/' + image.name;
        createRecipe('./data/recipe_full.json', req.body, (err)=>{
            if(err) {
                res.sendStatus(500);
            }
            res.redirect('./crearReceta?err=false');
        });
    } else {
        res.redirect('./crearReceta?err=true');
    }
    
});

module.exports = router;