const { Router } = require('express');
const homePage = require('../controllers/homePage.controller');
const router = Router();


router.get('/', homePage.home);
router.post('/upload', homePage.upload);

module.exports=router;