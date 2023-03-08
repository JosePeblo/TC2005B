const { Router } = require('express');
const { sendAll, sendOne, searchOne, createRecipe } = require('../recipe');
const { sendHtml } = require('../utils');
const router = Router();

router.get('/recetas', (req, res) => {
    sendAll('./data/recipe_desc.json', res);
    
});

router.get('/receta/:id', (req, res, next) => {
    searchOne('./data/recipe_desc.json', req.params.id, (err, stat) => {
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
        if(!image) 
            return res.sendStatus(400);
        image.mv(__dirname + '/../public/images/' + image.name);
        req.body.src = './images/' + image.name;
        createRecipe(req.body, image, ()=>{});
        res.redirect('./crearReceta');
    } else {
        res.redirect('./crearReceta?err=true');
    }
});

module.exports = router;