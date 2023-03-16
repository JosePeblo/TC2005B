const { Router } = require('express');
const questionsController = require('../controllers/questions.controller');
const recipeController = require('../controllers/recipe.controller');
const router = Router();

router.get('/', recipeController.getAllRecipeCards);

router.get('/preguntas', questionsController.getQuestions);

module.exports = router;