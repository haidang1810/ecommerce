const express = require('express');
const router = express.Router();
const staffController = require('../app/controllers/staffController');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
router.get('/getByUser/', checkLogin, checkRuleAdmin, staffController.getByUser);
module.exports = router;
