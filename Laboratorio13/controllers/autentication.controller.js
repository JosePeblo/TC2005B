const { readFile, writeFile } = require('fs');
const User = require('../models/user');
const { hashPassword, validatePassword } = require('../utils/password');

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.login = (req, res) => {
    const query = req.body;
    readFile('./data/users.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500);
        } else {
            const users = JSON.parse(data);
            if(users[query.user] === hashPassword(query.password)) {
                console.log('Logged in');
                res.redirect('/');
            } else {
                res.redirect('./login?attempt=fail')
            }
        }
    });
}

exports.signupPage = (req, res) => {
    res.render('signup');
}

exports.signup = (req, res) => {
    const query = req.body;
    readFile('./data/users.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500);
        } else {
            const users = JSON.parse(data);
            if(users[query.user]) {
                res.redirect('./signup?attempt=badUser');
            } else {
                if(query.user && query.password === query.confirmPass && validatePassword(query.password)) {
                    users[query.user] = hashPassword(query.password);
                    writeFile('./data/users.json', JSON.stringify(users), () => {
                        console.log('Se ha creado un nuevo usuario');
                        res.redirect('/');
                    });
                } else {
                    res.redirect('./signup?attempt=badRequest');
                }
                
            }
            /*
            if(users[query.user] === hashPassword(query.password)) {
                console.log('Logged in');
                res.redirect('/');
            } else {
                res.redirect('./login?attempt=fail')
            }*/
        }
    });
    console.log(query);
}