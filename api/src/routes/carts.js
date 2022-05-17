const express = require('express');
const router = express.Router();

const CartsController = require('../app/controllers/CartsController');


router.get('/getByUser/:user', CartsController.getByUser);
module.exports = router;