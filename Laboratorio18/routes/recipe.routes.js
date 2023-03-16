const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller');
const router = Router();
const isAuth = require('../utils/auth');

router.get('/recetas/:id', recipeController.getRecipe);

router.get('/crear', isAuth, recipeController.getSubmitionForm);

router.post('/crear', isAuth, recipeController.createRecipe);

module.exports = router;