module.exports = (req, res, next) => {
    if(!(req.session.privileges.indexOf('Create posts') >= 0)) {
        return res.redirect('/');
    }
    next();
}