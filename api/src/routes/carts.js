const express = require('express');
const router = express.Router();

const cartsController = require('../app/controllers/CartsController');


router.get('/getByUser/:user', cartsController.getByUser);
module.exports = router;