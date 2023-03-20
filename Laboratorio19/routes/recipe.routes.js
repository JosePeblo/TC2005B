const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller');
const router = Router();
const isAuth = require('../utils/auth');
const isCreator = require('../utils/isCreator');

router.get('/recetas/:id', recipeController.getRecipe);

router.get('/crear', isAuth, isCreator, recipeController.getSubmitionForm);

router.post('/crear', isAuth, isCreator, recipeController.createRecipe);

module.exports = router;