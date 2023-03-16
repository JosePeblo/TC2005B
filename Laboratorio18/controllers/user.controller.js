exports.profile = (req, res) => {
    res.render('profile', {session: req.session.user});
    
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}