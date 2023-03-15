exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile', {session: req.session.user});
    } else {
        res.redirect('login');
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}