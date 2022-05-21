const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const OrdersController = require('../app/controllers/OrdersController');

router.get('/getAll', checkLogin, checkRuleAdmin, OrdersController.getAll);
router.post('/createOrder', checkLogin, OrdersController.createOrder);
router.post('/changeStatus',  OrdersController.changeStatus);

module.exports = router;