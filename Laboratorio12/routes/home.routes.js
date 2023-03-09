const { Router } = require('express');
const { getAll } = require('../recipe');
const router = Router();

router.get('/', (req, res) => {
    getAll('./data/recipe_full.json', (err, data) => {
        if(err)
            res.status(500);
        else {
           try {
                res.render('index', {content: JSON.parse(data)});
           } catch {
                res.render('index', {content: null})
           }
        }
    });
});

router.get('/preguntas', (req, res) => {
    res.render('preguntas');
});

module.exports = router;