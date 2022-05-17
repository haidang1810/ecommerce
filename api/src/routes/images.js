const express = require('express');
const router = express.Router();

const ImagesController = require('../app/controllers/ImagesController');

router.get('/getByProduct/:id', ImagesController.getByProduct);
module.exports = router;