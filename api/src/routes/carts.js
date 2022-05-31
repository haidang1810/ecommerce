const express = require('express');
const checkLogin = require('../app/middleware/checkLogin');
const router = express.Router();

const CartsController = require('../app/controllers/CartsController');


router.get('/getByUser/', checkLogin, CartsController.getByUser);
router.post('/add', checkLogin, CartsController.add);
router.get('/delete/:id', checkLogin, CartsController.delete);
router.post('/updateAmount', checkLogin, CartsController.updateAmount);
module.exports = router;