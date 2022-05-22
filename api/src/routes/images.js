const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const ImagesController = require('../app/controllers/ImagesController');

router.get('/getByProduct/:id', ImagesController.getByProduct);
router.post('/add/', checkLogin, checkRuleAdmin, ImagesController.add);
router.get('/delete/:id', checkLogin, checkRuleAdmin, ImagesController.delete);
module.exports = router;