const express = require('express');
const fileUpload = require('express-fileupload');
const { initRoutes } = require('./routes');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded( {extended:true} ))
app.use(express.static(path.join(__dirname, 'public')));
initRoutes(app);

app.listen(3000, () => {console.log('App listening on http://localhost:3000');});
