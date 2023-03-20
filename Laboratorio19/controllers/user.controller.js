const Recipe = require("../models/recipe");
const User = require("../models/user");

exports.profile = (req, res) => {
    if(req.session.privileges.indexOf('Delete all posts') >= 0) {
        Recipe.fetchAll().then(([rows, fieldData]) => {
            res.render('profile', {content: rows , session: req.session.user});
        })    
    } else {
        User.fetchUserRecipes(req.session.userid).then(([rows, fieldData]) => {
            res.render('profile', {content: rows , session: req.session.user});
        })
    }
    
}

exports.delete = (req, res) => {
    if(req.session.privileges.indexOf('Delete all posts') >= 0) {
        Recipe.deleteOne(req.body.delete).then(() => {
            res.redirect('./profile?success=1');
        });
    } else if (req.session.privileges.indexOf('Delete your own posts') >= 0) {
        Recipe.fetchUserRecipes(req.body.delete, req.session.userid).then(([rows, fieldData]) => {
            if(rows.length !== 1) {
                res.redirect('./profile?success=0');
            } else {
                Recipe.deleteOne(req.body.delete).then(() => {
                    res.redirect('./profile?success=1');
                });
            }
        });
    } else {
        res.redirect('./profile?success=-1');
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}