const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const OrdersController = require('../app/controllers/OrdersController');

router.get('/getAll', OrdersController.getAll);

module.exports = router;