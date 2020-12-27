const express = require('express');
const UploadController = require('../controllers/upload');
const { verifyToken } = require('../middlewares/authentication');
const fileUpload = require('express-fileupload');

const app = express();
// default options
app.use(fileUpload({useTempFiles : true}));

app.put('/upload/:tipo/:id', verifyToken, UploadController.upload);

module.exports = app;