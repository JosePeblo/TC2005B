exports.getQuestions = (req, res) => {
    res.render('preguntas', {session: req.session.user});
}