const express = require('express');
const fileUpload = require('express-fileupload');
const { initRoutes } = require('./routes')
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded( {extended:true} ))
app.use(express.static('public'));
app.use('/recetas', express.static('public'));
initRoutes(app);

app.listen(3000, () => {console.log('App listening on http://localhost:3000');});
