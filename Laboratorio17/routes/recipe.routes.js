const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller');
const router = Router();

router.get('/recetas/:id', recipeController.getRecipe);

router.get('/crear', recipeController.getSubmitionForm);

router.post('/crear', recipeController.createRecipe);

module.exports = router;