const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { hashPassword, validatePassword } = require('../utils/password');

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.login = (req, res) => {
    const query = req.body;
    User.fetchOne(query.user).then(([rows, fiedData]) => {
        if(rows.length > 0) {
            bcrypt.compare(query.password, rows[0].password)
            .then(doMatch => {
                if(doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.userid = rows[0].id_user;
                    req.session.user = rows[0].username;
                    res.redirect('/');
                } else {
                    res.redirect('./login?attempt=fail');
                }
            });
        } else {
            res.redirect('./login?attempt=fail');
        }
    }).catch(()=>{ console.log('Database Error'); });
}

exports.signupPage = (req, res) => {
    res.render('signup');
    
}

exports.signup = (req, res) => {
    const query = req.body;
    if(query.user && (query.password === query.confirmPass) && validatePassword(query.password)) {

        User.fetchOne(query.user).then(([rows, fiedData]) => {
            if(rows.length !== 0) {
                res.redirect('./signup?attempt=badUser');
            } else {
                const user = new User(query.user, query.password);
                user.save().then(result => {
                    req.session.isLoggedIn = true;
                    req.session.userid = result.insertId;
                    req.session.user = query.user;
                    res.redirect('/');  
                })

            }
        }).catch(()=>{ console.log('Database Error'); });

    } else {
        res.redirect('./signup?attempt=badRequest');
    }
}