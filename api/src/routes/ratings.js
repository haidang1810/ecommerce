const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const RatingsController = require('../app/controllers/RatingsController');

router.get('/getAll', RatingsController.getAll);
router.get('/getByProduct/:id', RatingsController.getByProduct);
router.post('/add/', checkLogin, RatingsController.add);
router.post('/replyByAdmin/', checkLogin, checkRuleAdmin, RatingsController.replyByAdmin);
module.exports = router;