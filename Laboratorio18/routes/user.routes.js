const { Router } = require('express');
const userController = require('../controllers/user.controller');
const router = Router();
const isAuth = require('../utils/auth');

router.get('/profile', isAuth, userController.profile);
router.get('/logout', userController.logout);

module.exports = router;