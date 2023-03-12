const User = require('../models/user');
const { hashPassword, validatePassword } = require('../utils/password');

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.login = (req, res) => {
    const query = req.body;

    new User().fetchOne(query.user, (password) => {
        if(password === hashPassword(query.password)) {
            console.log('Logged in');
            res.redirect('/');
        } else {
            res.redirect('./login?attempt=fail')
        }
    });
}

exports.signupPage = (req, res) => {
    res.render('signup');
}

exports.signup = (req, res) => {
    const query = req.body;
    const user = new User();

    user.fetchOne(query.user, (password) => {
        
        if(password){
            res.redirect('./signup?attempt=badUser');
        } else if(query.user && query.password === query.confirmPass && validatePassword(query.password)) {
            user.setUser(query.user, query.password)
            user.save(() => {
                console.log('Se ha creado un nuevo usuario');
                res.redirect('/');
            });
        } else {
            res.redirect('./signup?attempt=badRequest');
        }
        
    });
}