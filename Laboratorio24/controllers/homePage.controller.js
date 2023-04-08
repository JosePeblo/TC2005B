const { unlink } = require("fs").promises;
const Photo = require("../models/photo");
const path = require('path');

/** @type {import("express").RequestHandler} */
exports.home = async (req, res) => {
    res.render('index');
}

/** @type {import("express").RequestHandler} */
exports.upload = async (req, res) => {
    const file = req.file;
    if(file) {
        const [rows] = await new Photo(file.filename).save();
        const inserted = rows.affectedRows;
        res.status(200).json({ message: `${inserted} photo has been uploaded to the server` });
    } else {
        res.status(400).json({ message: 'There was no file sent or the format was not an image' });
    }
}

/** @type {import("express").RequestHandler} */
exports.photos = async (req, res) => {
    const [rows] = await Photo.getAllPaths();
    res.json(rows);
}

/** @type {import("express").RequestHandler} */
exports.delete = async (req, res) => {
    const id = req.params.id;
    const [itemDeleted] = await Photo.getOnePath(id);
    const [deletedResult] = await Photo.delete(id);

    if(itemDeleted[0]) {
        const filePath = path.join(__dirname, '..', 'public', 'uploads', itemDeleted[0].path);
        await unlink(filePath);
    }

    const itemsDeleted = deletedResult.affectedRows;
    res.json({ message: `Deleted ${itemsDeleted} photos`, deleted: itemsDeleted });
}