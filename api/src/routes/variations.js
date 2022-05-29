const express = require('express');
const router = express.Router();
const VariationsController = require('../app/controllers/VariationsController');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');


router.get('/getByProduct/:id', VariationsController.getByProduct);
router.post('/add/', checkLogin, checkRuleAdmin, VariationsController.add);
router.post('/delete/', checkLogin, checkRuleAdmin, VariationsController.delete);
router.post('/addOption/', checkLogin, checkRuleAdmin, VariationsController.addOption);
router.post('/changeStatusOption/', checkLogin, checkRuleAdmin, VariationsController.changeStatusOption);
router.post('/deleteOption/', checkLogin, checkRuleAdmin, VariationsController.deleteOption);

module.exports = router;