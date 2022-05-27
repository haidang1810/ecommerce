const express = require('express');
const router = express.Router();
const VariationsController = require('../app/controllers/VariationsController');

router.get('/getByProduct/:id', VariationsController.getByProduct);

module.exports = router;