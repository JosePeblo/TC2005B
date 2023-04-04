const Photo = require("../models/photo")

/** @type {import("express").RequestHandler} */
exports.home = async (req, res) => {
    const [photos] = await Photo.getAllPaths();
    res.render('index', { photos: photos });
}

/** @type {import("express").RequestHandler} */
exports.upload = async (req, res) => {
    await new Photo(req.file.filename).save();
    res.redirect('/');
}