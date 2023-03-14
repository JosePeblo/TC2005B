const { Router } = require('express');
const router = Router();
const autenticationController = require('../controllers/autentication.controller');

router.get('/login', autenticationController.loginPage);

router.post('/login', autenticationController.login);

router.get('/signup', autenticationController.signupPage);

router.post('/signup', autenticationController.signup);

module.exports = router;