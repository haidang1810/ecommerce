const express = require('express');
const checkLogin = require('../app/middleware/checkLogin');
const router = express.Router();

const CartsController = require('../app/controllers/CartsController');


router.get('/getByUser/', checkLogin, CartsController.getByUser);
router.post('/add', checkLogin, CartsController.add);
module.exports = router;