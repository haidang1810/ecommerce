const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const GroupsController = require('../app/controllers/GroupsController');

router.get('/getAll', checkLogin, checkRuleAdmin, GroupsController.getAll);
router.get('/delete/:id', checkLogin, checkRuleAdmin, GroupsController.delete);
router.post('/add/', checkLogin, checkRuleAdmin, GroupsController.add);

module.exports = router;