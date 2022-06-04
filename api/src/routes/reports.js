const express = require('express');
const router = express.Router();
const ReportsController = require('../app/controllers/ReportsController');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');

router.get('/baseInfo/', checkLogin, checkRuleAdmin, ReportsController.baseInfo);
router.post('/reportSales/', checkLogin, checkRuleAdmin, ReportsController.reportSales);
router.post('/reportOrder/', checkLogin, checkRuleAdmin, ReportsController.reportOrder);
router.post('/reportProduct/', checkLogin, checkRuleAdmin, ReportsController.reportProduct);
router.post('/reportBestSales/', checkLogin, checkRuleAdmin, ReportsController.reportBestSales);

module.exports = router;
