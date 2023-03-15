const express = require('express');
const cookieParser = require('cookie-parser');
const sesion = require('express-session');
const fileUpload = require('express-fileupload');
const { initRoutes } = require('./routes');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded( {extended:true} ))
app.use(express.static(path.join(__dirname, 'public')));
app.use(sesion({
    secret: '412ebf30-a94d-44c6-bb2a-c9084c9e31d0',
    resave: false,
    saveUninitialized: false
}));
initRoutes(app);

app.listen(3000, () => {console.log('App listening on http://localhost:3000');});
