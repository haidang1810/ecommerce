const express = require('express');
const router = express.Router();
const customersController = require('../app/controllers/CustomersController');
const checkLogin = require('../app/middleware/checkLogin');
router.get('/getByAccount/:user', checkLogin, customersController.getByAccount);
router.get('/getVerifyCode/:phone', customersController.getVerifyCode);
router.post('/changePhone/', checkLogin, customersController.changePhone);
router.post('/changeGmail/', checkLogin, customersController.changeGmail);
router.post('/changeInfo/', checkLogin, customersController.changeInfo);

module.exports = router;
