const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const ProductsController = require('../app/controllers/ProductsController');

router.get('/getAll', ProductsController.getAll);
router.get('/getByKeyword', ProductsController.getByKeyword);
router.get('/getDetail/:id', ProductsController.getDetail);
router.post('/add', checkLogin, checkRuleAdmin, ProductsController.add);
router.post('/edit', checkLogin, checkRuleAdmin, ProductsController.edit);
router.get('/delete/:id', checkLogin, checkRuleAdmin, ProductsController.delete);
module.exports = router;