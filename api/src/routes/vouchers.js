const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const VouchersController = require('../app/controllers/VouchersController');

router.get('/getAll', checkLogin, VouchersController.getAll);
module.exports = router;