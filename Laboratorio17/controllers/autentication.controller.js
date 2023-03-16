const User = require('../models/user');
const { hashPassword, validatePassword } = require('../utils/password');

exports.loginPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login');
    }
}

exports.login = (req, res) => {
    const query = req.body;
    User.fetchOne(query.user).then(([rows, fiedData]) => {
        if(rows.length === 0) {
            
            res.redirect('./login?attempt=fail');

        } else if(rows[0].password !== hashPassword(query.password)) {

            res.redirect('./login?attempt=fail');

        } else {
            
            req.session.userid = rows[0].id_user;
            req.session.user = rows[0].username;
            res.redirect('/');

        }
    }).catch(()=>{ console.log('Database Error'); });
}

exports.signupPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
}

exports.signup = (req, res) => {
    const query = req.body;
    if(query.user && (query.password === query.confirmPass) && validatePassword(query.password)) {

        User.fetchOne(query.user).then(([rows, fiedData]) => {
            if(rows.length !== 0) {
                res.redirect('./signup?attempt=badUser');
            } else {
                const user = new User(query.user, hashPassword(query.password));
                user.save().then(result => {
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