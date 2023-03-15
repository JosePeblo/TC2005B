const { Router } = require('express');
const userController = require('../controllers/user.controller');
const router = Router();

router.get('/profile', userController.profile);
router.get('/logout', userController.logout);

module.exports = router;