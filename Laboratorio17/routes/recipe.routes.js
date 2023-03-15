const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller');
const router = Router();

router.get('/recetas/:id', recipeController.getRecipe);

router.get('/recetas/crear', recipeController.getSubmitionForm);

router.post('/recetas/crear', recipeController.createRecipe);

module.exports = router;