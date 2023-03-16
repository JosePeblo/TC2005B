const homeRouter = require('./home.routes');
const recipeRouter = require('./recipe.routes');
const autenticationRouter = require('./autentication.routes');
const userRouter = require('./user.routes');

module.exports.initRoutes = (app) => {
    app.use('/', homeRouter);
    app.use('/', recipeRouter);
    app.use('/', autenticationRouter);
    app.use('/', userRouter);

    app.use((req,res) => {
        res.status(404).render('404');
    });
}