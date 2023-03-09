const { Router } = require('express');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    res.redirect('/');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    res.redirect('/');
});

module.exports = router;