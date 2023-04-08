const { Router } = require('express');
const homePage = require('../controllers/homePage.controller');
const router = Router();


router.get('/', homePage.home);
router.get('/photos', homePage.photos);
router.delete('/delete/:id', homePage.delete);
router.post('/upload', homePage.upload);

module.exports=router;