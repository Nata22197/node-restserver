const express = require('express');
const { verifyToken } = require('../middlewares/authentication');
const ImageController = require('../controllers/image');

const router = express();

router.get('/imagen/:type/:img', verifyToken, ImageController.getImage)

module.exports = router;