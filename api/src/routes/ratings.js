const express = require('express');
const router = express.Router();

const RatingsController = require('../app/controllers/RatingsController');

router.get('/getAll', RatingsController.getAll);
router.get('/getByProduct/:id', RatingsController.getByProduct);
module.exports = router;