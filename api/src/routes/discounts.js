const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const DiscountsController = require('../app/controllers/DiscountsController');

router.get('/getAll/', DiscountsController.getAll);
router.get('/getById/:id', DiscountsController.getById);
router.post('/add/', checkLogin, checkRuleAdmin, DiscountsController.add);
router.get('/delete/:id', checkLogin, checkRuleAdmin, DiscountsController.delete);

module.exports = router;