const express = require('express');
const router = express.Router();

const imagesController = require('../app/controllers/ImagesController');

router.get('/getByProduct/:id', imagesController.getByProduct);
module.exports = router;