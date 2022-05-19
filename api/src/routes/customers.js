const express = require('express');
const router = express.Router();
const customersController = require('../app/controllers/CustomersController');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
router.get('/getByAccount/:user', checkLogin, customersController.getByAccount);
router.get('/getVerifyCode/:phone', customersController.getVerifyCode);
router.post('/changePhone/', checkLogin, customersController.changePhone);
router.post('/changeGmail/', checkLogin, customersController.changeGmail);
router.post('/changeInfo/', checkLogin, customersController.changeInfo);
router.post('/add/', checkLogin, checkRuleAdmin, customersController.add);

module.exports = router;
