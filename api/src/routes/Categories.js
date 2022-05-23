const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const CategoriesController = require('../app/controllers/CategoriesController');

router.get('/getAll', CategoriesController.getAll);
router.post('/add', checkLogin, checkRuleAdmin, CategoriesController.add);
router.post('/edit', checkLogin, checkRuleAdmin, CategoriesController.edit);
router.get('/delete/:id', checkLogin, checkRuleAdmin, CategoriesController.delete);
module.exports = router;