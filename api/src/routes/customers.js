const express = require('express');
const router = express.Router();
const customersController = require('../app/controllers/CustomersController');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
router.get('/getAll/', checkLogin, checkRuleAdmin, customersController.getAll);
router.get('/searchByName/:name', checkLogin, checkRuleAdmin, customersController.searchByName);
router.get('/searchByPhone/:phone', checkLogin, customersController.searchByPhone);
router.get('/getByAccount/:user', checkLogin, checkRuleAdmin, customersController.getByAccount); 
router.get('/getMyAccount/', checkLogin, customersController.getMyAccount); 
router.get('/getVerifyCode/:phone', customersController.getVerifyCode);
router.post('/changePhone/', checkLogin, customersController.changePhone);
router.post('/changeGmail/', checkLogin, customersController.changeGmail);
router.post('/changeInfo/', checkLogin, customersController.changeInfo);
router.post('/add/', checkLogin, checkRuleAdmin, customersController.add);

module.exports = router;
