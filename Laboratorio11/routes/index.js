const homeRouter = require('./home.routes')
const recipeRouter = require('./recipe.routes')
const { sendHtml } = require('../utils');

module.exports.initRoutes = (app) => {
    app.use('/', homeRouter);
    app.use('/', recipeRouter);

    app.use((req,res) => {
        res.status(404);
        sendHtml('./pages/404.html', res);
    })
}