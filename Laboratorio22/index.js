require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { readFile } = require('fs').promises;

const home = require('./routes/home.routes');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: false }));


const fileStorage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'public/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || 
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'||
        file.mimetype == 'image/gif'||
        file.mimetype == 'image/webp' ) {
            callback(null, true);
    } else {
            callback(null, false);
    }
}
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('photo'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(home);

app.listen(3000, () => console.log('App listening on http://localhost:3000'));
