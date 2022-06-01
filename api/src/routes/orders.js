const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const OrdersController = require('../app/controllers/OrdersController');

router.get('/getAll', checkLogin, checkRuleAdmin, OrdersController.getAll);
router.post('/createOrder', OrdersController.createOrder);
router.post('/changeStatus',  checkLogin, OrdersController.changeStatus);
router.post('/getByCustomer', checkLogin,  checkRuleAdmin, OrdersController.getByCustomer);
router.get('/getById/:id', checkLogin,  OrdersController.getById);

module.exports = router;