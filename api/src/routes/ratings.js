const express = require('express');
const router = express.Router();

const ratingsController = require('../app/controllers/RatingsController');

router.get('/getAll', ratingsController.getAll);
router.get('/getByProduct/:id', ratingsController.getByProduct);
module.exports = router;